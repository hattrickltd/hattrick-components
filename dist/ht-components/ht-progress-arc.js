/*! Built with http://stenciljs.com */
const { h } = window.HtComponents;

class ProgressArc {
    constructor() {
        /* Color/appearance of stroke */
        // @Prop() stroke: string = "black";
        /** Indicating if the progress should instead be counter clockwise */
        this.counterClockwise = false;
    }
    completeChanged() { this.updateRadius(); }
    componentWillLoad() {
        if (!this.strokeWidth)
            this.strokeWidth = this.size / 5;
        this.updateRadius();
    }
    updateRadius() {
        // Firefox has a bug where it doesn't handle rotations and stroke dashes correctly.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=949661
        this.offset = /firefox/i.test(navigator.userAgent) ? -89.9 : -90;
        this.strokeWidthCapped = Math.min(this.strokeWidth, this.size / 2 - 1);
        this.radius = Math.max((this.size - this.strokeWidthCapped) / 2 - 1, 0);
        this.circumference = 2 * Math.PI * this.radius;
        this.transformValue = `rotate(${this.offset}, ${this.size / 2}, ${this.size / 2})`;
    }
    // private hasRestColor(): boolean {
    //   console.log(this.host.style.getPropertyValue("--progress-arc-rest-color"));
    //   return !!this.host.style.getPropertyValue("--progress-arc-rest-color");
    // }
    render() {
        return (h("svg", { style: { width: this.size + "px", height: this.size + "px" } },
            h("circle", { id: "background", fill: "none", cx: this.size / 2, cy: this.size / 2, r: this.radius, "stroke-dasharray": this.circumference, "stroke-dashoffset": (this.counterClockwise ? 1 : -1) * (this.complete) * this.circumference, transform: this.transformValue }),
            h("circle", { fill: "none", cx: this.size / 2, cy: this.size / 2, r: this.radius, "stroke-dasharray": this.circumference, "stroke-dashoffset": (this.counterClockwise ? -1 : 1) * (1 - this.complete) * this.circumference, transform: this.transformValue })));
    }
    static get is() { return "ht-progress-arc"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
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
    }; }
    static get style() { return ":host {\n  display: inline-block; }\n\ncircle {\n  stroke-width: var(--progress-arc-stroke-width, 8px);\n  stroke: var(--progress-arc-color, black); }\n\ncircle#background {\n  stroke-width: var(--progress-arc-stroke-width, 8px);\n  stroke: var(--progress-arc-rest-color, transparent); }"; }
}

class ProgressArc$1 {
    constructor() {
        /** Label for the mouseover stamina */
        this.staminaLabel = "Stamina";
    }
    componentWillLoad() {
        this.handleSize();
        this.updateStaminaClass();
    }
    componentWillUpdate() {
        this.handleSize();
        this.updateStaminaClass();
    }
    handleSize() {
        if (this.size === "small")
            this.size = 29;
        if (this.size === "large")
            this.size = 44;
    }
    updateStaminaClass() {
        if (this.stamina < 0.25)
            this.progressClass = "stamina-verylow";
        else if (this.stamina < 0.50)
            this.progressClass = "stamina-low";
        else if (this.stamina < 0.75)
            this.progressClass = "stamina-high";
        else
            this.progressClass = "stamina-veryhigh";
    }
    hostData() {
        return {
            style: {
                width: this.size + "px",
                height: this.size + "px",
            },
            title: `${this.staminaLabel}: ${this.stamina * 100}%`,
        };
    }
    render() {
        return ([
            h("span", { class: "rating" },
                h("span", { class: "rating-full" }, Math.floor(this.rating)),
                this.rating % 1 !== 0 &&
                    h("span", { class: "rating-half" }, ".5")),
            h("ht-progress-arc", { size: this.size, complete: this.stamina, class: this.progressClass })
        ]);
    }
    static get is() { return "ht-rating"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
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
    }; }
    static get style() { return ":host {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  background: var(--rating-background, white);\n  color: var(--rating-color, #666);\n  border-radius: 100% 100% 100% 100%;\n  font-weight: var(--rating-font-weight, bold);\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  --progress-arc-stroke-width: 4px;\n  --progress-arc-rest-color: var(--rating-stamina-arc-rest, #CCCCCC); }\n\n:host([size=\"small\"]) {\n  --progress-arc-stroke-width: 3px; }\n\nht-progress-arc {\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.stamina-verylow {\n  --progress-arc-color: var(--rating-stamina-arc-very-low, #DD4140); }\n\n.stamina-low {\n  --progress-arc-color: var(--rating-stamina-arc-low, #F5A104); }\n\n.stamina-high {\n  --progress-arc-color: var(--rating-stamina-arc-high, #F1C40A); }\n\n.stamina-veryhigh {\n  --progress-arc-color: var(--rating-stamina-arc-very-high, #31A94B); }\n\n.rating-full {\n  font-size: 1em; }\n\n.rating-half {\n  font-size: 0.6em; }"; }
}

export { ProgressArc as HtProgressArc, ProgressArc$1 as HtRating };
