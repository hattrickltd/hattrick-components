import { Component, Prop, Watch } from "@stencil/core";

@Component({
  tag: "ht-progress-arc",
  styleUrl: "progress-arc.scss",
  shadow: true,
})
export class ProgressArc {

  // @Element() private host: HTMLElement;

  /** Size of element in pixels. */
  @Prop() size: number;

  /** Width of progress arc stroke. */
  @Prop({ mutable: true }) strokeWidth: number;

  /* Color/appearance of stroke */
  // @Prop() stroke: string = "black";

  /** Indicating if the progress should instead be counter clockwise */
  @Prop() counterClockwise: boolean = false;

  /** Expression evaluating to float [0.0, 1.0] */
  @Prop() complete: number;
  @Watch("complete") completeChanged() { this.updateRadius(); }

  /* Color of the background ring. */
  // @Prop() background: string;

  private offset: number;
  private strokeWidthCapped: number;
  private radius: number;
  private circumference: number;
  private transformValue: string;

  componentWillLoad() {
    if (!this.strokeWidth) this.strokeWidth = this.size / 5;

    this.updateRadius();
  }

  updateRadius() {
    // Firefox has a bug where it doesn't handle rotations and stroke dashes correctly.
    // https://bugzilla.mozilla.org/show_bug.cgi?id=949661
    this.offset = /firefox/i.test(navigator.userAgent) ? -89.9 : -90;

    this.strokeWidthCapped = Math.min(this.strokeWidth, this.size / 2 - 1);
    this.radius = Math.max((this.size - this.strokeWidthCapped) / 2 - 1, 0);
    this.circumference = 2 * Math.PI * this.radius;

    this.transformValue = `rotate(${this.offset}, ${this.size / 2}, ${this.size / 2})`;
  }

  // private hasRestColor(): boolean {
  //   console.log(this.host.style.getPropertyValue("--progress-arc-rest-color"));
  //   return !!this.host.style.getPropertyValue("--progress-arc-rest-color");
  // }

  render() {
    return (
      <svg style={{ width: this.size + "px", height: this.size + "px" }}>
        <circle id="background"
                fill="none"
                cx={this.size/2}
                cy={this.size/2}
                r={this.radius}
                // stroke="none"
                // stroke-width="var(--progress-arc-stroke-width, 8px)" //{this.strokeWidthCapped}
                stroke-dasharray={this.circumference}
                stroke-dashoffset={(this.counterClockwise?1:-1)*(this.complete)*this.circumference}
                transform={this.transformValue}
        />
        <circle fill="none"
                cx={this.size/2}
                cy={this.size/2}
                r={this.radius}
                // stroke="none"
                // stroke-width="var(--progress-arc-stroke-width, 8px)" //{this.strokeWidthCapped}
                stroke-dasharray={this.circumference}
                stroke-dashoffset={(this.counterClockwise?-1:1)*(1-this.complete)*this.circumference}
                transform={this.transformValue}
        />
      </svg>
    );
  }
}
