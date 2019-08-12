import { h, Component, Prop, Host } from "@stencil/core";

@Component({
  tag: "hattrick-rating",
  styleUrl: "rating.css",
  shadow: true,
})
export class Rating {

  // @Element() private host: HTMLElement;

  /** Size of element in pixels. */
  @Prop({ mutable: true }) size: number | "small" | "large";

  /** The rating to show inside the stamina. */
  @Prop() rating: number;

  /** Stamina in percentage between 0 and 1. */
  @Prop() stamina: number;

  /** Label for the mouseover stamina */
  @Prop() staminaLabel: string = "Stamina";

  private progressClass: string;

  componentWillLoad() {
    this.handleSize();
    this.updateStaminaClass();
  }
  componentWillUpdate() {
    this.handleSize();
    this.updateStaminaClass();
  }

  private handleSize() {
    if (this.size === "small") this.size = 29;
    if (this.size === "large") this.size = 44;
  }

  private updateStaminaClass(): void {
    if (this.stamina < 0.25) this.progressClass = "stamina-verylow";
    else if (this.stamina < 0.50) this.progressClass = "stamina-low";
    else if (this.stamina < 0.75) this.progressClass = "stamina-high";
    else this.progressClass = "stamina-veryhigh";
  }

  render() {
    return (
      <Host title={ `${this.staminaLabel}: ${Math.round(this.stamina * 100)}%` } style={{
        width: this.size + "px",
        height: this.size + "px",
      }}>
        <span class="rating">
          <span class="rating-full">{ Math.floor(this.rating) }</span>
          { this.rating % 1 !== 0 &&
            <span class="rating-half">.5</span>
          }
        </span>
        <hattrick-progress-arc size={ (this.size as number) } complete={ this.stamina } class={ this.progressClass }></hattrick-progress-arc>
      </Host>
    );
  }
}
