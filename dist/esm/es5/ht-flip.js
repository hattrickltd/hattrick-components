/*! Built with http://stenciljs.com */
import { h } from './ht-components.core.js';
var Flip = /** @class */ (function () {
    function Flip() {
    }
    Flip.prototype.render = function () {
        return (h("div", { class: "wrapper" }, h("div", { class: "front" }, h("slot", { name: "front" })), h("div", { class: "back" }, h("slot", { name: "back" }))));
    };
    Object.defineProperty(Flip, "is", {
        get: function () { return "ht-flip"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flip, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flip, "properties", {
        get: function () {
            return {
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
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Flip, "style", {
        get: function () { return ":host {\n  display: inline-block;\n  width: var(--flip-width, auto);\n  height: var(--flip-height, auto); }\n\n.wrapper {\n  position: relative;\n  -webkit-perspective: 800px;\n  perspective: 800px;\n  width: 100%;\n  height: 100%;\n  display: inline-block;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-transition: -webkit-transform var(--flip-duration, 1s);\n  transition: -webkit-transform var(--flip-duration, 1s);\n  transition: transform var(--flip-duration, 1s);\n  transition: transform var(--flip-duration, 1s), -webkit-transform var(--flip-duration, 1s); }\n\n.front, .back {\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transition: opacity .2s linear .3s;\n  transition: opacity .2s linear .3s;\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.front {\n  opacity: 1; }\n\n.back {\n  opacity: 0;\n  margin-top: -100%; }\n\n:host([flipped]) .front {\n  opacity: 0; }\n\n:host([flipped]) .back {\n  opacity: 1; }\n\n:host([direction=\"x\"]) .back {\n  -webkit-transform: rotateX(180deg);\n  transform: rotateX(180deg); }\n\n:host([direction=\"y\"]) .back {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg); }\n\n:host([flipped][direction=\"x\"]) .wrapper {\n  -webkit-transform: rotateX(180deg);\n  transform: rotateX(180deg); }\n\n:host([flipped][direction=\"y\"]) .wrapper {\n  -webkit-transform: rotateY(180deg);\n  transform: rotateY(180deg); }\n\n\@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .front, .back {\n    -webkit-transform: none !important;\n    transform: none !important;\n    position: absolute;\n    top: 0;\n    margin-top: 0; }\n  :host([flipped]) .wrapper {\n    -webkit-transform: none !important;\n    transform: none !important; } }"; },
        enumerable: true,
        configurable: true
    });
    return Flip;
}());
export { Flip as HtFlip };
