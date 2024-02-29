import { h, Component, Prop, Watch, State } from "@stencil/core";

@Component({
  tag: "hattrick-progress-arc",
  styleUrl: "progress-arc.css",
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
  @Watch("complete") completeChanged() {
    this.updateRadius();
  }

  @Prop() angle: number = 0;

  @Prop() circumference: number = 360;

  /* Color of the background ring. */
  // @Prop() background: string;

  @State() private offset: number;
  @State() private strokeWidthCapped: number;
  @State() private radius: number;
  @State() private fillCircumference: number;
  @State() private backgroundTransformValue: string;
  @State() private foregroundTransformValue: string;

  componentWillLoad() {
    this.updateRadius();
  }

  componentWillUpdate() {
    this.updateRadius();
  }

  private updateRadius() {
    // Firefox has a bug where it doesn't handle rotations and stroke dashes correctly.
    // https://bugzilla.mozilla.org/show_bug.cgi?id=949661
    // this.offset = /firefox/i.test(navigator.userAgent) ? -89.9 : -90;
    this.offset = -180 + this.angle;

    this.strokeWidthCapped = Math.min(
      this.strokeWidth || this.size / 5,
      this.size / 2 - 1
    );
    this.radius = Math.max((this.size - this.strokeWidthCapped) / 2 - 1, 0);
    this.fillCircumference = 2 * Math.PI * this.radius;

    this.backgroundTransformValue = `rotate(${this.offset}, ${this.size / 2}, ${
      this.size / 2
    })`;

    this.foregroundTransformValue = `rotate(${this.angle - 90}, ${
      this.size / 2
    }, ${this.size / 2})`;
  }

  // private hasRestColor(): boolean {
  //   console.log(this.host.style.getPropertyValue("--progress-arc-rest-color"));
  //   return !!this.host.style.getPropertyValue("--progress-arc-rest-color");
  // }

  render() {
    const circumferenceDecimal = this.circumference / 360;

    return (
      <svg style={{ width: this.size + "px", height: this.size + "px" }}>
        <circle
          id="background"
          fill="none"
          cx={this.size / 2}
          cy={this.size / 2}
          r={this.radius}
          // stroke="none"
          // stroke-width="var(--progress-arc-stroke-width, 8px)" //{this.strokeWidthCapped}
          stroke-dasharray={this.fillCircumference}
          stroke-dashoffset={
            (this.counterClockwise ? 1 : -1) *
            (1 - circumferenceDecimal) *
            this.fillCircumference
          }
          transform={this.backgroundTransformValue}
        />
        <circle
          fill="none"
          cx={this.size / 2}
          cy={this.size / 2}
          r={this.radius}
          // stroke="none"
          // stroke-width="var(--progress-arc-stroke-width, 8px)" //{this.strokeWidthCapped}
          stroke-dasharray={this.fillCircumference}
          stroke-dashoffset={
            (this.counterClockwise ? -1 : 1) *
            (1 - this.complete * circumferenceDecimal) *
            this.fillCircumference
          }
          transform={this.foregroundTransformValue}
        />
      </svg>
    );
  }
}
