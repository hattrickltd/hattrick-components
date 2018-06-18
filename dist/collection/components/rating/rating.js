export class ProgressArc {
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
    static get style() { return "/**style-placeholder:ht-rating:**/"; }
}
