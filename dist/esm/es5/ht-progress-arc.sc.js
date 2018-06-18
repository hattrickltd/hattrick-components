/*! Built with http://stenciljs.com */
import { h } from './ht-components.core.js';
var ProgressArc = /** @class */ (function () {
    function ProgressArc() {
        /* Color/appearance of stroke */
        // @Prop() stroke: string = "black";
        /** Indicating if the progress should instead be counter clockwise */
        this.counterClockwise = false;
    }
    ProgressArc.prototype.completeChanged = function () { this.updateRadius(); };
    ProgressArc.prototype.componentWillLoad = function () {
        if (!this.strokeWidth)
            this.strokeWidth = this.size / 5;
        this.updateRadius();
    };
    ProgressArc.prototype.updateRadius = function () {
        // Firefox has a bug where it doesn't handle rotations and stroke dashes correctly.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=949661
        this.offset = /firefox/i.test(navigator.userAgent) ? -89.9 : -90;
        this.strokeWidthCapped = Math.min(this.strokeWidth, this.size / 2 - 1);
        this.radius = Math.max((this.size - this.strokeWidthCapped) / 2 - 1, 0);
        this.circumference = 2 * Math.PI * this.radius;
        this.transformValue = "rotate(" + this.offset + ", " + this.size / 2 + ", " + this.size / 2 + ")";
    };
    // private hasRestColor(): boolean {
    //   console.log(this.host.style.getPropertyValue("--progress-arc-rest-color"));
    //   return !!this.host.style.getPropertyValue("--progress-arc-rest-color");
    // }
    ProgressArc.prototype.render = function () {
        return (h("svg", { style: { width: this.size + "px", height: this.size + "px" } }, h("circle", { id: "background", fill: "none", cx: this.size / 2, cy: this.size / 2, r: this.radius, "stroke-dasharray": this.circumference, "stroke-dashoffset": (this.counterClockwise ? 1 : -1) * (this.complete) * this.circumference, transform: this.transformValue }), h("circle", { fill: "none", cx: this.size / 2, cy: this.size / 2, r: this.radius, "stroke-dasharray": this.circumference, "stroke-dashoffset": (this.counterClockwise ? -1 : 1) * (1 - this.complete) * this.circumference, transform: this.transformValue })));
    };
    Object.defineProperty(ProgressArc, "is", {
        get: function () { return "ht-progress-arc"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressArc, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressArc, "properties", {
        get: function () {
            return {
                "complete": {
                    "type": Number,
                    "attr": "complete",
                    "watchCallbacks": ["completeChanged"]
                },
                "counterClockwise": {
                    "type": Boolean,
                    "attr": "counter-clockwise"
                },
                "size": {
                    "type": Number,
                    "attr": "size"
                },
                "strokeWidth": {
                    "type": Number,
                    "attr": "stroke-width",
                    "mutable": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressArc, "style", {
        get: function () { return "[data-ht-progress-arc-host] {\n  display: inline-block; }\n\ncircle[data-ht-progress-arc] {\n  stroke-width: var(--progress-arc-stroke-width, 8px);\n  stroke: var(--progress-arc-color, black); }\n\ncircle#background[data-ht-progress-arc] {\n  stroke-width: var(--progress-arc-stroke-width, 8px);\n  stroke: var(--progress-arc-rest-color, transparent); }"; },
        enumerable: true,
        configurable: true
    });
    return ProgressArc;
}());
var ProgressArc$1 = /** @class */ (function () {
    function ProgressArc$1() {
        /** Label for the mouseover stamina */
        this.staminaLabel = "Stamina";
    }
    ProgressArc$1.prototype.componentWillLoad = function () {
        this.handleSize();
        this.updateStaminaClass();
    };
    ProgressArc$1.prototype.componentWillUpdate = function () {
        this.handleSize();
        this.updateStaminaClass();
    };
    ProgressArc$1.prototype.handleSize = function () {
        if (this.size === "small")
            this.size = 29;
        if (this.size === "large")
            this.size = 44;
    };
    ProgressArc$1.prototype.updateStaminaClass = function () {
        if (this.stamina < 0.25)
            this.progressClass = "stamina-verylow";
        else if (this.stamina < 0.50)
            this.progressClass = "stamina-low";
        else if (this.stamina < 0.75)
            this.progressClass = "stamina-high";
        else
            this.progressClass = "stamina-veryhigh";
    };
    ProgressArc$1.prototype.hostData = function () {
        return {
            style: {
                width: this.size + "px",
                height: this.size + "px",
            },
            title: this.staminaLabel + ": " + this.stamina * 100 + "%",
        };
    };
    ProgressArc$1.prototype.render = function () {
        return ([
            h("span", { class: "rating" }, h("span", { class: "rating-full" }, Math.floor(this.rating)), this.rating % 1 !== 0 &&
                h("span", { class: "rating-half" }, ".5")),
            h("ht-progress-arc", { size: this.size, complete: this.stamina, class: this.progressClass })
        ]);
    };
    Object.defineProperty(ProgressArc$1, "is", {
        get: function () { return "ht-rating"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressArc$1, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressArc$1, "properties", {
        get: function () {
            return {
                "rating": {
                    "type": Number,
                    "attr": "rating"
                },
                "size": {
                    "type": "Any",
                    "attr": "size",
                    "mutable": true
                },
                "stamina": {
                    "type": Number,
                    "attr": "stamina"
                },
                "staminaLabel": {
                    "type": String,
                    "attr": "stamina-label"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ProgressArc$1, "style", {
        get: function () { return "[data-ht-rating-host] {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  background: var(--rating-background, white);\n  color: var(--rating-color, #666);\n  border-radius: 100% 100% 100% 100%;\n  font-weight: var(--rating-font-weight, bold);\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  --progress-arc-stroke-width: 4px;\n  --progress-arc-rest-color: var(--rating-stamina-arc-rest, #CCCCCC); }\n\n[size=\"small\"][data-ht-rating-host] {\n  --progress-arc-stroke-width: 3px; }\n\nht-progress-arc[data-ht-rating] {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.stamina-verylow[data-ht-rating] {\n  --progress-arc-color: var(--rating-stamina-arc-very-low, #DD4140); }\n\n.stamina-low[data-ht-rating] {\n  --progress-arc-color: var(--rating-stamina-arc-low, #F5A104); }\n\n.stamina-high[data-ht-rating] {\n  --progress-arc-color: var(--rating-stamina-arc-high, #F1C40A); }\n\n.stamina-veryhigh[data-ht-rating] {\n  --progress-arc-color: var(--rating-stamina-arc-very-high, #31A94B); }\n\n.rating-full[data-ht-rating] {\n  font-size: 1em; }\n\n.rating-half[data-ht-rating] {\n  font-size: 0.6em; }"; },
        enumerable: true,
        configurable: true
    });
    return ProgressArc$1;
}());
export { ProgressArc as HtProgressArc, ProgressArc$1 as HtRating };
