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

  private strokeWidth: number;
  private offset: number;

  componentWillLoad() {
    this.updateRadius();
  }

  componentWillUpdate() {
    this.updateRadius();
  }

  private updateRadius() {
    this.strokeWidth = parseInt(
      getComputedStyle(this.host)
        .getPropertyValue("--progress-arc-stroke-width")
        ?.replace("px", ""),
    );

    if (!this.strokeWidth) {
      this.strokeWidth = 8;
    }

    this.offset = this.angle - 90;
  }

  render() {
    const circumferenceDecimal = this.circumference / 360;
    const { size, strokeWidth, offset } = this;

    return (
      <svg
        style={{
          width: this.size + "px",
          height: this.size + "px",
          transform: `rotate(${offset}deg)`,
        }}
      >
        <circle
          class="track"
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke-width={strokeWidth}
          stroke-dasharray={100 * circumferenceDecimal}
          pathLength={100}
        ></circle>
        <circle
          class="progress"
          cx={size / 2}
          cy={size / 2}
          r={(size - strokeWidth) / 2}
          fill="none"
          stroke-width={strokeWidth}
          stroke-dasharray={100}
          stroke-dashoffset={100 - this.complete * 100 * circumferenceDecimal}
          pathLength={100}
        ></circle>
      </svg>
    );
  }
}
