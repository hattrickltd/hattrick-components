/*! Built with http://stenciljs.com */
const { h } = window.HtComponents;

class Flip {
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
    static get style() { return "\n[data-ht-flip-host] {\n  display: inline-block;\n  width: var(--flip-width, auto);\n  height: var(--flip-height, auto); }\n\n.wrapper[data-ht-flip] {\n  position: relative;\n  -webkit-perspective: 800px;\n  perspective: 800px;\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-transition: -webkit-transform var(--flip-duration, 1s);\n  transition: -webkit-transform var(--flip-duration, 1s);\n  transition: transform var(--flip-duration, 1s);\n  transition: transform var(--flip-duration, 1s), -webkit-transform var(--flip-duration, 1s); }\n\n.front[data-ht-flip], .back[data-ht-flip] {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition: opacity .2s linear .3s;\n  transition: opacity .2s linear .3s;\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.front[data-ht-flip] {\n  opacity: 1; }\n\n.back[data-ht-flip] {\n  opacity: 0;\n  margin-top: -100%; }\n\n[flipped][data-ht-flip-host]   .front[data-ht-flip] {\n  opacity: 0; }\n\n[flipped][data-ht-flip-host]   .back[data-ht-flip] {\n  opacity: 1; }\n\n[direction=\"x\"][data-ht-flip-host]   .back[data-ht-flip] {\n  -webkit-transform: rotateX(180deg);\n  transform: rotateX(180deg); }\n\n[direction=\"y\"][data-ht-flip-host]   .back[data-ht-flip] {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg); }\n\n[flipped][direction=\"x\"][data-ht-flip-host]   .wrapper[data-ht-flip] {\n  -webkit-transform: rotateX(180deg);\n  transform: rotateX(180deg); }\n\n[flipped][direction=\"y\"][data-ht-flip-host]   .wrapper[data-ht-flip] {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg); }\n\n\@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .front[data-ht-flip], .back[data-ht-flip] {\n    -webkit-transform: none !important;\n    transform: none !important;\n    position: absolute;\n    top: 0;\n    margin-top: 0; }\n  [flipped][data-ht-flip-host]   .wrapper[data-ht-flip] {\n    -webkit-transform: none !important;\n    transform: none !important; } }\n"; }
}

export { Flip as HtFlip };
