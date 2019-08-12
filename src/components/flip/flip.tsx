import { h, Component, Prop } from "@stencil/core";

@Component({
  tag: "hattrick-flip",
  styleUrl: "flip.css",
  shadow: true,
})
export class Flip {

  /**
   * If the container should be flipped (showing back) or not.
   */
  @Prop({ reflectToAttr: true, mutable: true }) flipped: boolean;

  /**
   * If the flip container should rotate horizontally (`x`) or vertically (`y`).
   */
  @Prop() direction: "x" | "y";

  render() {
    return (
      <div class="wrapper">
        <div class="front">
          <slot name="front" />
        </div>
        <div class="back">
          <slot name="back" />
        </div>
      </div>
    );
  }
}

