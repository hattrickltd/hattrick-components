import { h, Fragment, Component, Prop, Host, State, Watch, Element } from "@stencil/core";

@Component({
  tag: "hattrick-rating",
  styleUrl: "rating.css",
  shadow: true,
})
export class Rating {
  @Element() private host: HTMLElement;

  /** Size of element in pixels. */
  @Prop({ mutable: true }) size: number | "small" | "medium" | "large" = "small";

  /** The rating to show inside the stamina. */
  @Prop() rating: number;

  /** Stamina in percentage between 0 and 1. */
  @Prop() stamina: number;

  /** Label for the mouseover, formatted as `{staminaLabel}: {stamina}%` */
  @Prop() staminaLabel: string = "";

  @Prop({ reflect: true }) noStar: boolean = false;

  @State() private pixelSize: number;
  @State() private progressOffset: number;
  @State() private progressClass: string;

  componentDidLoad() {
    this.handleSize();
    this.updateStaminaClass();
  }

  @Watch("size")
  private handleSize() {
    this.progressOffset = parseInt(
      getComputedStyle(this.host).getPropertyValue("--rating-stamina-offset")?.replace("px", ""),
    );

    if (this.size === "small") {
      this.pixelSize = 28;
    } else if (this.size === "medium") {
      this.pixelSize = 36;
    } else if (this.size === "large") {
      this.pixelSize = 44;
    } else {
      this.pixelSize = +this.size;
    }

    // console.log("handleSize", this.size, this.pixelSize, this.progressOffset);
  }

  @Watch("stamina")
  private updateStaminaClass(): void {
    if (this.stamina < 0.25) this.progressClass = "stamina-verylow";
    else if (this.stamina < 0.5) this.progressClass = "stamina-low";
    else if (this.stamina < 0.75) this.progressClass = "stamina-high";
    else this.progressClass = "stamina-veryhigh";
  }

  render() {
    if (!this.pixelSize) return <></>;

    const hasRating = this.rating !== undefined && this.rating !== null;

    return (
      <Host
        title={
          this.staminaLabel
            ? `${this.staminaLabel}: ${Math.round((this.stamina || 0) * 100)}%`
            : undefined
        }
        style={{
          width: this.pixelSize + "px",
          height: this.pixelSize + "px",
        }}
      >
        <span
          class={{
            "rating": true,
            "rating-long": this.rating >= 10 && this.rating % 1 !== 0,
          }}
          part="rating"
        >
          <span class="rating-full" part="rating-full">
            {hasRating ? Math.floor(this.rating) : <>&nbsp;</>}
          </span>
          {hasRating && this.rating % 1 !== 0 && (
            <span class="rating-half" part="rating-half">
              .5
            </span>
          )}
        </span>
        {!this.noStar && (
          <svg id="star" viewBox="0 0 8.4666665 8.4666666" version="1.1">
            <path
              fill="var(--rating-star-color, currentColor)"
              d="m 4.0332499,1.1106795 c 0.5115278,-1.02023338 1.0537473,-1.00224168 1.205089,0.017639 l 0.2758722,1.871839 h 1.9490974 c 1.0720917,0 1.1486445,0.4801306 0.1700389,1.1105445 L 5.8542889,5.2388853 6.1301612,7.0835604 C 6.2815028,8.1030884 5.7862028,8.4177664 5.0302,7.7873524 L 3.6550721,6.6394134 1.8760137,7.7841774 C 0.8977607,8.4145914 0.51534959,8.0956804 1.0258192,7.0757994 L 1.9553887,5.2215992 0.57990789,4.1107019 C -0.17574211,3.4809935 0.08249119,3.0001574 1.1545831,3.0001574 H 3.1040332 L 4.0332499,1.1106795"
            />
          </svg>
        )}
        <hattrick-progress-arc
          part="progress-arc"
          size={this.pixelSize - this.progressOffset * 2}
          complete={this.stamina || 0}
          angle={this.noStar ? 0 : 90}
          circumference={this.noStar ? 360 : 270}
          class={this.progressClass}
        ></hattrick-progress-arc>
      </Host>
    );
  }
}
