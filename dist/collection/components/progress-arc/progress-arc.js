export class ProgressArc {
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
    static get style() { return "/**style-placeholder:ht-progress-arc:**/"; }
}
