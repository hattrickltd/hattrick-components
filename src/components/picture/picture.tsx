import { h, Component, State, Prop, Element } from "@stencil/core";
import { waitForIntersection } from "../../global/lazy-loading";

@Component({
  tag: "hattrick-picture",
  shadow: false,
})
export class Picture {

  @Element() host: HTMLHattrickPictureElement;

  @Prop() src: string;
  @Prop() srcset?: string;
  @Prop() alt: string;
  @Prop() lazyMargin: string;

  @State() private didIntersect: boolean = false;

  componentWillLoad() {
    waitForIntersection(this.host, this.lazyMargin).then(() => {
      this.didIntersect = true;
    });
  }

  render() {
    if (!this.didIntersect) return;

    return (
      <picture>
        <slot />
        <img src={ this.src } alt={ this.alt } srcset={ this.srcset } />
      </picture>
    );
  }
}
