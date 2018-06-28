/*! Built with http://stenciljs.com */
import { h } from './ht-components.core.js';
var Tooltip = /** @class */ (function () {
    function Tooltip() {
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
    Object.defineProperty(Tooltip.prototype, "ltr", {
        get: function () {
            return !this.rtl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip.prototype, "rtl", {
        get: function () {
            return this.dir === "rtl";
        },
        enumerable: true,
        configurable: true
    });
    // private _hostStyle: CSSStyleDeclaration;
    Tooltip.prototype.componentWillLoad = function () {
        // this._hostStyle = window.getComputedStyle(this.host, null);
        // this.host.addEventListener("focus", (ev: any) => {
        //   console.log("focus");
        //   this.onMouseOver(ev);
        // }, { capture: true })
        if (typeof this.dir === "undefined") {
            this.dir = getComputedStyle(this.host).direction || "ltr";
        }
    };
    Tooltip.prototype.onMouseOver = function (ev) {
        //console.debug("onMouseOver", ev);
        this.calculatePosition(ev);
        this.showTooltip = true;
    };
    Tooltip.prototype.onMouseLeave = function () {
        this.showTooltip = false;
    };
    Tooltip.prototype.calculatePosition = function (ev) {
        var hostRect = this.host.getBoundingClientRect();
        // const tooltipRect = this.host.shadowRoot.querySelector(".tooltip").getBoundingClientRect();
        if (this.position === "cursor") {
            var top = 0;
            var left = 0;
            if (ev instanceof MouseEvent) {
                top = ev.clientY + 15; // we fake the cursor height to 15px
                left = ev.clientX;
            }
            else if (ev instanceof FocusEvent) {
                var target = ev.target;
                top = target.offsetTop - ev.view.scrollY + target.offsetHeight;
                left = target.offsetLeft - ev.view.scrollX;
            }
            return this.cssPos = {
                top: top + "px",
                left: left + "px",
            };
        }
        else if (this.position === "top") {
            this.cssPos = { bottom: "calc(100% - " + hostRect.top + "px)" };
            this.calculateHorizontalPosition(hostRect);
            return this.cssPos;
        }
        else if (this.position === "bottom") {
            this.cssPos = { top: hostRect.bottom + "px" };
            this.calculateHorizontalPosition(hostRect);
            return this.cssPos;
        }
        else if ((this.ltr && this.position === "start") || (this.rtl && this.position === "end")) {
            this.cssPos = { right: "calc(100% - " + hostRect.left + "px)" };
            this.calculateVerticalPosition(hostRect);
            return this.cssPos;
        }
        else if ((this.ltr && this.position === "end") || (this.rtl && this.position === "start")) {
            this.cssPos = { left: hostRect.right + "px" };
            this.calculateVerticalPosition(hostRect);
            return this.cssPos;
        }
    };
    Tooltip.prototype.calculateVerticalPosition = function (hostRect) {
        if (this.arrow === "end")
            this.cssPos.bottom = "calc(100% - " + hostRect.bottom + "px";
        else if (this.arrow === "middle")
            this.cssPos.top = "calc(" + hostRect.top + "px + " + hostRect.height + "px / 2";
        else
            this.cssPos.top = "calc(" + hostRect.top + "px";
    };
    Tooltip.prototype.calculateHorizontalPosition = function (hostRect) {
        if ((this.ltr && this.arrow === "end") || (this.rtl && this.arrow === "start"))
            this.cssPos.right = "calc(100% - " + hostRect.right + "px)";
        else if (this.arrow === "middle")
            this.cssPos.left = "calc(" + hostRect.left + "px + " + hostRect.width + "px / 2";
        else
            this.cssPos.left = hostRect.left + "px";
    };
    Tooltip.prototype.hostData = function () {
        return {
            "role": "tooltip",
            "aria-describedby": "tooltip",
            "aria-controls": "tooltip",
            "aria-expanded": this.showTooltip,
        };
    };
    Tooltip.prototype.render = function () {
        return ([
            h("slot", null),
            h("div", { id: "tooltip", style: this.cssPos, hidden: !this.showTooltip }, this.content, h("slot", { name: "content" }))
        ]);
    };
    Object.defineProperty(Tooltip, "is", {
        get: function () { return "ht-tooltip"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip, "listeners", {
        get: function () {
            return [{
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
                }];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tooltip, "style", {
        get: function () { return "\n[data-ht-tooltip-host]   [slot=\"content\"][data-ht-tooltip] {\n  position: fixed; }\n\n#tooltip[data-ht-tooltip] {\n  position: fixed;\n  text-align: initial;\n  max-width: var(--tooltip-max-width, 99vw);\n  font-size: var(--tooltip-font-size, 12px);\n  background-color: var(--tooltip-background, white);\n  color: var(--tooltip-color, #575757);\n  border: var(--tooltip-border, 1px solid #767676);\n  border-radius: var(--tooltop-border-radius, 0px);\n  padding: var(--tooltip-padding, 0.2em 0.35em);\n  -webkit-box-shadow: var(--tooltip-box-shadow, 4px 4px 2px -3px #767676);\n  box-shadow: var(--tooltip-box-shadow, 4px 4px 2px -3px #767676);\n  z-index: 10000;\n  pointer-events: var(--tooltip-pointer-events, none);\n  opacity: 1;\n  visibility: visible;\n  -webkit-transition: margin .3s, opacity .3s;\n  transition: margin .3s, opacity .3s;\n  -webkit-transition-delay: var(--tooltip-delay, 0s);\n  transition-delay: var(--tooltip-delay, 0s); }\n  #tooltip[hidden][data-ht-tooltip] {\n    opacity: 0;\n    display: block;\n    visibility: hidden; }\n\n[data-ht-tooltip-host]:not([arrow]), [arrow][arrow=\"none\"][data-ht-tooltip-host] {\n  --tooltop-arrow-size: 0px; }\n  [data-ht-tooltip-host]:not([arrow])   #tooltip[data-ht-tooltip], [arrow][arrow=\"none\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n    -webkit-transition: opacity .3s;\n    transition: opacity .3s; }\n  [data-ht-tooltip-host]:not([arrow])   #tooltip[data-ht-tooltip]:before, [arrow][arrow=\"none\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    content: unset; }\n\n[arrow][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  position: absolute;\n  content: '';\n  border: var(--tooltop-arrow-size, 0px) solid transparent; }\n\n[arrow=\"start\"][position=\"start\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip], [arrow=\"start\"][position=\"end\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  -webkit-transform: translateY(-5px);\n  transform: translateY(-5px); }\n\n[arrow=\"start\"][position=\"start\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before, [arrow=\"start\"][position=\"end\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  top: 5px; }\n\n[arrow=\"start\"][position=\"top\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  left: 5px; }\n\n[arrow=\"start\"][position=\"top\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  right: 5px; }\n\n[arrow=\"start\"][position=\"bottom\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  left: 5px; }\n\n[arrow=\"start\"][position=\"bottom\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  right: 5px; }\n\n[arrow=\"middle\"][position=\"start\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip], [arrow=\"middle\"][position=\"end\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n[arrow=\"middle\"][position=\"start\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before, [arrow=\"middle\"][position=\"end\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n  transform: translateY(-50%); }\n\n[arrow=\"middle\"][position=\"top\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip], [arrow=\"middle\"][position=\"bottom\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%); }\n\n[arrow=\"middle\"][position=\"top\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before, [arrow=\"middle\"][position=\"bottom\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%); }\n\n[arrow=\"end\"][position=\"start\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip], [arrow=\"end\"][position=\"end\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  -webkit-transform: translateY(5px);\n  transform: translateY(5px); }\n\n[arrow=\"end\"][position=\"start\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before, [arrow=\"end\"][position=\"end\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  bottom: 5px; }\n\n[arrow=\"end\"][position=\"top\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  right: 5px; }\n\n[arrow=\"end\"][position=\"top\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  left: 5px; }\n\n[arrow=\"end\"][position=\"bottom\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  right: 5px; }\n\n[arrow=\"end\"][position=\"bottom\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n  left: 5px; }\n\n[no-animate][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  -webkit-transition: none;\n  transition: none;\n  margin: 0; }\n\n[position=\"top\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  margin-bottom: calc(var(--tooltop-arrow-size, 0px) + 3px); }\n  [position=\"top\"][data-ht-tooltip-host]   #tooltip[hidden][data-ht-tooltip] {\n    margin-bottom: calc(var(--tooltop-arrow-size, 0px) + 10px); }\n  [position=\"top\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    top: 100%;\n    border-top-color: var(--tooltip-border-color, var(--tooltip-background, transparent)); }\n\n[position=\"bottom\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  margin-top: calc(var(--tooltop-arrow-size, 0px) + 3px); }\n  [position=\"bottom\"][data-ht-tooltip-host]   #tooltip[hidden][data-ht-tooltip] {\n    margin-top: calc(var(--tooltop-arrow-size, 0px) + 10px); }\n  [position=\"bottom\"][data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    bottom: 100%;\n    border-bottom-color: var(--tooltip-border-color, var(--tooltip-background, transparent)); }\n\n[position=\"start\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  margin-right: calc(var(--tooltop-arrow-size, 0px) + 3px); }\n  [position=\"start\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[hidden][data-ht-tooltip] {\n    margin-right: calc(var(--tooltop-arrow-size, 0px) + 3px + 10px); }\n  [position=\"start\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    left: 100%;\n    border-left-color: var(--tooltip-border-color, var(--tooltip-background, transparent)); }\n\n[position=\"start\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  margin-left: calc(var(--tooltop-arrow-size, 0px) + 3px); }\n  [position=\"start\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[hidden][data-ht-tooltip] {\n    margin-left: calc(var(--tooltop-arrow-size, 0px) + 3px + 10px); }\n  [position=\"start\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    right: 100%;\n    border-right-color: var(--tooltip-border-color, var(--tooltip-background, transparent)); }\n\n[position=\"end\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  margin-left: calc(var(--tooltop-arrow-size, 0px) + 3px); }\n  [position=\"end\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[hidden][data-ht-tooltip] {\n    margin-left: calc(var(--tooltop-arrow-size, 0px) + 3px + 10px); }\n  [position=\"end\"][data-ht-tooltip-host] ([dir=\"ltr\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    right: 100%;\n    border-right-color: var(--tooltip-border-color, var(--tooltip-background, transparent)); }\n\n[position=\"end\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip] {\n  margin-right: calc(var(--tooltop-arrow-size, 0px) + 3px); }\n  [position=\"end\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[hidden][data-ht-tooltip] {\n    margin-right: calc(var(--tooltop-arrow-size, 0px) + 3px + 10px); }\n  [position=\"end\"][data-ht-tooltip-host] ([dir=\"rtl\"])[data-ht-tooltip-host]   #tooltip[data-ht-tooltip]:before {\n    left: 100%;\n    border-left-color: var(--tooltip-border-color, var(--tooltip-background, transparent)); }\n"; },
        enumerable: true,
        configurable: true
    });
    return Tooltip;
}());
export { Tooltip as HtTooltip };
