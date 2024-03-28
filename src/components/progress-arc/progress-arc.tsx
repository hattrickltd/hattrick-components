import { h, Component, Prop, Watch, Element, Host } from "@stencil/core";

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
    const { size, strokeWidth, offset, circumference } = this;
    const circumferenceDecimal = circumference / 360;

    let trackDashArray = 100 * circumferenceDecimal;
    let progressDashArray = 100;
    let progressDashOffset = 100 - this.complete * 100 * circumferenceDecimal;

    // If the circumference is 360, we don't need a dash array since we'll just fill the whole thing.
    if (circumference === 360) trackDashArray = null;

    // The dash array creates a gap in the stroke, so if we want a full circle we
    // simply don't use the dash array since we'll just fill the whole thing.
    if (this.complete === 1 && circumference === 360) progressDashArray = null;

    return (
      <Host role="meter" aria-valuemin={0} aria-valuemax={100} aria-valuenow={100 * this.complete}>
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
            stroke-dasharray={trackDashArray}
            pathLength={100}
          ></circle>
          {this.complete > 0 && (
            <circle
              class="progress"
              cx={size / 2}
              cy={size / 2}
              r={(size - strokeWidth) / 2}
              fill="none"
              stroke-width={strokeWidth}
              stroke-dasharray={progressDashArray}
              stroke-dashoffset={progressDashOffset}
              pathLength={100}
            ></circle>
          )}
        </svg>
      </Host>
    );
  }
}
