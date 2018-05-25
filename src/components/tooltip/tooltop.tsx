import { Component, Prop, Listen, State, Element } from '@stencil/core';

@Component({
  tag: 'ht-tooltip',
  styleUrl: 'tooltip.scss',
  shadow: true
})
export class Tooltip {

  @Element() host: HTMLElement;

  /**
   * The position of the arrow. Will be ignored if `position` is not set.
   * `start` will put the arrow to the left or top.
   * `middle` will put the arrow to the middle or center.
   * `end` will put the arrow to the right or bottom.
   */
  @Prop({ reflectToAttr: true }) arrow: "start" | "middle" | "end" | "none" = "none";

  /** The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip. */
  @Prop() content: string = "";

  /**
   * Which side of the element the tooltip should be shown.
   * `cursor` will put it approximately below the cursor. Using `cursor` will also disable animations.
   */
  @Prop({ reflectToAttr: true }) position: "top" | "bottom" | "left" | "right" | "cursor" = "cursor";

  @State() showTooltip: boolean = false;
  @State() cssPos: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  } = {};

  // private _hostStyle: CSSStyleDeclaration;

  componentWillLoad() {
    // this._hostStyle = window.getComputedStyle(this.host, null);
    // this.host.addEventListener("focus", (ev: any) => {
    //   console.log("focus");
    //   this.onMouseOver(ev);
    // }, { capture: true })
  }

  @Listen("mouseover")
  @Listen("focus", { capture: true })
  onMouseOver(ev: MouseEvent) {
    //console.debug("onMouseOver", ev);
    this.calculatePosition(ev);
    this.showTooltip = true;
  }
  
  @Listen("mouseleave")
  @Listen("blur", { capture: true })
  onMouseLeave() {
    this.showTooltip = false;
  }

  calculatePosition(ev: MouseEvent | FocusEvent) {
    const hostRect = this.host.getBoundingClientRect();
    // const tooltipRect = this.host.shadowRoot.querySelector(".tooltip").getBoundingClientRect();

    if (this.position === "cursor") {
      let top = 0;
      let left = 0;

      if (ev instanceof MouseEvent) {
        top = ev.clientY + 15; // we fake the cursor height to 15px
        left = ev.clientX;
      } else if (ev instanceof FocusEvent) {
        let target = (ev.target as HTMLElement);
        top = target.offsetTop - ev.view.scrollY + target.offsetHeight;
        left = target.offsetLeft - ev.view.scrollX;
      }

      return this.cssPos = {
        top: top + "px",
        left: left + "px",
      }
    }
    else if (this.position === "top") {
      this.cssPos = { bottom: `calc(100% - ${hostRect.top}px)` };

      if (this.arrow === "end") this.cssPos.right = `calc(100% - ${hostRect.right}px)`;
      else if (this.arrow === "middle") this.cssPos.left = `calc(${hostRect.left}px + ${hostRect.width}px / 2`;
      else this.cssPos.left = `${hostRect.left}px`;

      return this.cssPos;
    }
    else if (this.position === "bottom") {
      this.cssPos = { top: hostRect.bottom + "px" };

      if (this.arrow === "end") this.cssPos.right = `calc(100% - ${hostRect.right}px)`;
      else if (this.arrow === "middle") this.cssPos.left = `calc(${hostRect.left}px + ${hostRect.width}px / 2`
      else this.cssPos.left = `${hostRect.left}px`;

      return this.cssPos;
    }
    else if (this.position === "left") {
      this.cssPos = { right: `calc(100% - ${hostRect.left}px)` };

      // if (this.arrow === "middle") this.cssPos.top = `calc(${hostRect.top}px - ${tooltipRect.height}px / 2)`
      if (this.arrow === "end") this.cssPos.bottom = `calc(100% - ${hostRect.bottom}px`
      else if (this.arrow === "middle") this.cssPos.top = `calc(${hostRect.top}px + ${hostRect.height}px / 2`
      else this.cssPos.top = `calc(${hostRect.top}px`
    }
    else if (this.position === "right") {
      this.cssPos = { left: hostRect.right + "px" };

      // if (this.arrow === "middle") this.cssPos.top = `calc(${hostRect.top}px - ${tooltipRect.height}px / 2)`
      if (this.arrow === "end") this.cssPos.bottom = `calc(100% - ${hostRect.bottom}px`
      else if (this.arrow === "middle") this.cssPos.top = `calc(${hostRect.top}px + ${hostRect.height}px / 2`
      else this.cssPos.top = `calc(${hostRect.top}px`
    }
  }

  hostData() {
    return {
      "role": "tooltip",
      "aria-describedby": "tooltip",
      "aria-controls": "tooltip",
      "aria-expanded": this.showTooltip,
    }
  }

  render() {
    return ([
      <slot />,
      <div id="tooltip" style={ this.cssPos } hidden={ !this.showTooltip }>
        { this.content }
        <slot name="content"></slot>
      </div>
    ]
      // <div id="wrapper" role="tooltip" aria-describedby="tooltip" aria-controls="tooltip" aria-expanded={ this.showTooltip }>
      //   <slot />
      //   <div id="tooltip" style={ this.cssPos } hidden={ !this.showTooltip }>
      //     { this.content }
      //     <slot name="content"></slot>
      //   </div>
      // </div>
    );
  }
}
