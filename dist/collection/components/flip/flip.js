export class Flip {
    render() {
        return (h("div", { class: "wrapper" },
            h("div", { class: "front" },
                h("slot", { name: "front" })),
            h("div", { class: "back" },
                h("slot", { name: "back" }))));
    }
    static get is() { return "ht-flip"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "direction": {
            "type": String,
            "attr": "direction"
        },
        "flipped": {
            "type": Boolean,
            "attr": "flipped",
            "reflectToAttr": true,
            "mutable": true
        }
    }; }
    static get style() { return "/**style-placeholder:ht-flip:**/"; }
}
