import { Component, Prop } from "@stencil/core";

@Component({
  tag: "hattrick-flip",
  styleUrl: "flip.scss",
  shadow: true,
})
export class Flip {

  @Prop({ reflectToAttr: true, mutable: true }) flipped: boolean;

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

