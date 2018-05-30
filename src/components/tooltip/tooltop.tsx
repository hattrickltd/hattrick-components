import { Component, Prop, Listen, State, Element } from "@stencil/core";

@Component({
  tag: "ht-tooltip",
  styleUrl: "tooltip.scss",
  shadow: true,
})
export class Tooltip {

  @Element() host: HTMLStencilElement;

  @Prop({ reflectToAttr: true, mutable: true }) dir: string;
  private get ltr(): boolean {
    return !this.rtl;
  }
  private get rtl(): boolean {
    return this.dir === "rtl";
  }

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
  @Prop({ reflectToAttr: true }) position: "top" | "bottom" | "start" | "end" | "cursor" = "cursor";

  @State() showTooltip: boolean = false;
  @State() cssPos: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  } = {};

  @Prop({ context: "window" }) win!: Window;

  // private _hostStyle: CSSStyleDeclaration;

  componentWillLoad() {
    // this._hostStyle = window.getComputedStyle(this.host, null);
    // this.host.addEventListener("focus", (ev: any) => {
    //   console.log("focus");
    //   this.onMouseOver(ev);
    // }, { capture: true })
    if (typeof this.dir === "undefined") {
      this.dir = getComputedStyle(this.host).direction || "ltr";
    }
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
      };
    }
    else if (this.position === "top") {
      this.cssPos = { bottom: `calc(100% - ${hostRect.top}px)` };

      this.calculateHorizontalPosition(hostRect);

      return this.cssPos;
    }
    else if (this.position === "bottom") {
      this.cssPos = { top: hostRect.bottom + "px" };

      this.calculateHorizontalPosition(hostRect);

      return this.cssPos;
    }
    else if ((this.ltr && this.position === "start") || (this.rtl && this.position === "end")) {
      this.cssPos = { right: `calc(100% - ${hostRect.left}px)` };

      this.calculateVerticalPosition(hostRect);

      return this.cssPos;
    }
    else if ((this.ltr && this.position === "end") || (this.rtl && this.position === "start")) {
      this.cssPos = { left: hostRect.right + "px" };

      this.calculateVerticalPosition(hostRect);

      return this.cssPos;
    }
  }

  private calculateVerticalPosition(hostRect: ClientRect | DOMRect) {
    if (this.arrow === "end")
      this.cssPos.bottom = `calc(100% - ${hostRect.bottom}px`;
    else if (this.arrow === "middle")
      this.cssPos.top = `calc(${hostRect.top}px + ${hostRect.height}px / 2`;
    else
      this.cssPos.top = `calc(${hostRect.top}px`;
  }

  private calculateHorizontalPosition(hostRect: ClientRect | DOMRect) {
    if ((this.ltr && this.arrow === "end") || (this.rtl && this.arrow === "start"))
      this.cssPos.right = `calc(100% - ${hostRect.right}px)`;
    else if (this.arrow === "middle")
      this.cssPos.left = `calc(${hostRect.left}px + ${hostRect.width}px / 2`;
    else
      this.cssPos.left = `${hostRect.left}px`;
  }

  hostData() {
    return {
      "role": "tooltip",
      "aria-describedby": "tooltip",
      "aria-controls": "tooltip",
      "aria-expanded": this.showTooltip,
    };
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
