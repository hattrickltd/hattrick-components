export class Tooltip {
    constructor() {
        /**
         * The position of the arrow. Will be ignored if `position` is not set.
         * `start` will put the arrow to the left or top.
         * `middle` will put the arrow to the middle or center.
         * `end` will put the arrow to the right or bottom.
         */
        this.arrow = "none";
        /** The content of the title. Can also be set with `slot="content"` to enable HTML in the tooltip. */
        this.content = "";
        /**
         * Which side of the element the tooltip should be shown.
         * `cursor` will put it approximately below the cursor. Using `cursor` will also disable animations.
         */
        this.position = "cursor";
        this.showTooltip = false;
        this.cssPos = {};
    }
    get ltr() {
        return !this.rtl;
    }
    get rtl() {
        return this.dir === "rtl";
    }
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
    onMouseOver(ev) {
        //console.debug("onMouseOver", ev);
        this.calculatePosition(ev);
        this.showTooltip = true;
    }
    onMouseLeave() {
        this.showTooltip = false;
    }
    calculatePosition(ev) {
        const hostRect = this.host.getBoundingClientRect();
        // const tooltipRect = this.host.shadowRoot.querySelector(".tooltip").getBoundingClientRect();
        if (this.position === "cursor") {
            let top = 0;
            let left = 0;
            if (ev instanceof MouseEvent) {
                top = ev.clientY + 15; // we fake the cursor height to 15px
                left = ev.clientX;
            }
            else if (ev instanceof FocusEvent) {
                let target = ev.target;
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
    calculateVerticalPosition(hostRect) {
        if (this.arrow === "end")
            this.cssPos.bottom = `calc(100% - ${hostRect.bottom}px`;
        else if (this.arrow === "middle")
            this.cssPos.top = `calc(${hostRect.top}px + ${hostRect.height}px / 2`;
        else
            this.cssPos.top = `calc(${hostRect.top}px`;
    }
    calculateHorizontalPosition(hostRect) {
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
            h("slot", null),
            h("div", { id: "tooltip", style: this.cssPos, hidden: !this.showTooltip },
                this.content,
                h("slot", { name: "content" }))
        ]);
    }
    static get is() { return "ht-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "arrow": {
            "type": String,
            "attr": "arrow",
            "reflectToAttr": true
        },
        "content": {
            "type": String,
            "attr": "content"
        },
        "cssPos": {
            "state": true
        },
        "dir": {
            "type": String,
            "attr": "dir",
            "reflectToAttr": true,
            "mutable": true
        },
        "host": {
            "elementRef": true
        },
        "position": {
            "type": String,
            "attr": "position",
            "reflectToAttr": true
        },
        "showTooltip": {
            "state": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "mouseover",
            "method": "onMouseOver",
            "passive": true
        }, {
            "name": "focus",
            "method": "onMouseOver",
            "capture": true
        }, {
            "name": "mouseleave",
            "method": "onMouseLeave",
            "passive": true
        }, {
            "name": "blur",
            "method": "onMouseLeave",
            "capture": true
        }]; }
    static get style() { return "/**style-placeholder:ht-tooltip:**/"; }
}
