import { h, Component, Prop, Watch, Element } from "@stencil/core";

@Component({
  tag: "hattrick-progress-arc",
  styleUrl: "progress-arc.css",
  shadow: true,
})
export class ProgressArc {
  @Element() private host: HTMLElement;

  /** Size of element in pixels. */
  @Prop() size: number;

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

  private offset: number;
  // private strokeWidthCapped: number;
  private radius: number;
  private fillCircumference: number;
  private backgroundTransformValue: string;
  private foregroundTransformValue: string;
  private strokeWidth: number;

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

    this.strokeWidth = parseInt(
      getComputedStyle(this.host)
        .getPropertyValue("--progress-arc-stroke-width")
        ?.replace("px", "")
    );

    if (!this.strokeWidth) {
      this.strokeWidth = 8;
    }

    this.offset = -180 + this.angle;

    this.radius = (this.size - this.strokeWidth) / 2;
    this.fillCircumference = 2 * Math.PI * this.radius;

    // console.log(this.host, this.size, this.radius, this.strokeWidth);

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
          stroke-width={this.strokeWidth}
          // stroke-width="var(--progress-arc-stroke-width, 3px)"
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
          stroke-width={this.strokeWidth}
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
