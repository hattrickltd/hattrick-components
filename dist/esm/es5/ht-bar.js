var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/*! Built with http://stenciljs.com */
import { h } from './ht-components.core.js';
import { a as LazyLoadedComponent } from './chunk-b197b654.js';
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Bar = /** @class */ (function (_super_1) {
    __extends(Bar, _super_1);
    function Bar() {
        var _this = _super_1.apply(this, arguments) || this;
        /** The maximum level the bar should show. */
        _this.max = 20;
        /** If there's a max before the end of the bar (e.g. maxed youth skill). */
        _this.cap = 0;
        /** If the sublevel is the same as the levelCap. */
        _this.isCap = false;
        /** The label shown inside the bar */
        _this.label = "";
        /** The denomination of the skill level */
        _this.denomination = "";
        _this.hideContent = false;
        /** Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport */
        _this.lazy = true;
        /** The text for the level when denomination is not used */
        _this.levelText = "";
        /** Which column the skill level should be shown in. */
        _this.showSkillInColumn = BarPart.Max;
        /** The width of the label text */
        _this.labelTextWidth = 0;
        /** The width of the level text */
        _this.levelTextWidth = 0;
        /** If the level text doesn't fit anywhere, we need to force it in. */
        _this.forceLevelTextPosition = false;
        _this.didLoad = false;
        return _this;
    }
    Object.defineProperty(Bar.prototype, "totalWidth", {
        get: function () {
            return this.host.clientWidth;
        },
        enumerable: true,
        configurable: true
    });
    Bar.prototype.componentWillLoad = function () {
        var _super = function (name) { return _super_1.prototype[name]; };
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._hostStyle = window.getComputedStyle(this.host, null);
                        return [4 /*yield*/, (this.lazy)];
                    case 1:
                        (_a.sent()) ? _super("lazyLoad").call(this, this.host) : Promise.resolve();
                        this.didLoad = true;
                        this.setCalculations(false);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bar.prototype.componentDidLoad = function () {
        if (!this.didLoad)
            return;
        this.setCalculations();
    };
    Bar.prototype.componentWillUpdate = function () {
        if (!this.didLoad)
            return;
        this.setCalculations();
    };
    Bar.prototype.setCalculations = function (didLoad) {
        if (didLoad === void 0) { didLoad = true; }
        // WARNING! The order these calculations are called is very important.
        // That's why we check `!this.hideContent` twice!
        this.skillWidth = this.getSkillWidth();
        this.capWidth = this.getCapWidth();
        if (!this.hideContent) {
            this.levelText = this.getLevelText();
            this.labelTextWidth = getTextWidth(this.label, this._hostStyle.font);
            this.levelTextWidth = getTextWidth(this.levelText, this._hostStyle.font);
            if (didLoad) {
                if (this.denomination) {
                    this.forceLevelTextPosition = false;
                    this.showSkillInColumn = BarPart.None;
                }
                else if (this.doesLevelTextFitInMaxColumn()) {
                    this.forceLevelTextPosition = false;
                    this.showSkillInColumn = BarPart.Max;
                }
                else if (this.doesLevelTextFitInCapColumn()) {
                    this.forceLevelTextPosition = false;
                    this.showSkillInColumn = BarPart.Cap;
                }
                else if (this.doesLevelTextFitInLevelColumn()) {
                    this.forceLevelTextPosition = false;
                    this.showSkillInColumn = BarPart.Level;
                }
                else {
                    this.forceLevelTextPosition = true;
                    if (this.hasMaxBar())
                        this.showSkillInColumn = BarPart.Max;
                    else if (this.hasCapBar())
                        this.showSkillInColumn = BarPart.Cap;
                    else
                        this.showSkillInColumn = BarPart.Level;
                }
            }
        }
        this.numberPadding = this.getNumberPadding();
    };
    /** Convert percentage width to actual width based on the component width */
    Bar.prototype.percentageToPixels = function (percentage) {
        if (percentage > 1)
            percentage /= 100;
        return this.totalWidth * percentage;
    };
    /** Get the percentage width of the skill column */
    Bar.prototype.getSkillWidth = function () {
        if (this.level <= 0)
            return 0;
        else if (this.level > this.max)
            return 100;
        else
            return this.level / this.max * 100;
    };
    /** Get the percentage width of the cap column */
    Bar.prototype.getCapWidth = function () {
        if (!this.hasCapBar())
            return 0;
        return (this.cap / this.max * 100) - this.skillWidth;
    };
    /** Get how much padding the skill text should have (in case skill label `name` is longer than skill column + cap column) */
    Bar.prototype.getNumberPadding = function () {
        var textWidth = this.labelTextWidth;
        var paddingLeft = 0;
        var skillWidth = this.percentageToPixels(this.skillWidth + this.capWidth);
        if (skillWidth < textWidth) {
            paddingLeft = textWidth - skillWidth + 5;
        }
        return paddingLeft;
    };
    Bar.prototype.getLevelText = function () {
        if (this.cap > 0) {
            return this.getSkillNumberText(this.level) + " / " + this.cap;
        }
        else {
            return this.getSkillNumberText(this.level);
        }
    };
    Bar.prototype.getSkillNumberText = function (level) {
        if (level < 0) {
            return "-";
        }
        else if (level > this.max) {
            return this.max + " (+" + (level - this.max) + ")";
            // return "20 (+" + (level - 20) + ")";
        }
        else {
            return level.toString();
        }
    };
    Bar.prototype.hasCapBar = function () {
        return this.cap > 0 && this.cap !== this.level;
    };
    Bar.prototype.hasMaxBar = function () {
        return this.level < this.max && this.cap < this.max;
    };
    Bar.prototype.doesLevelTextFitInMaxColumn = function () {
        // const numberEl = this._root.querySelectorAll(".number")[0];
        // const numberStyle = window.getComputedStyle(numberEl, null);
        // const spacing = numberStyle.marginLeft + numberStyle.marginRight + numberStyle.paddingLeft + numberStyle.paddingRight;
        var lastColumnWidth = this.percentageToPixels(100 - this.capWidth - this.skillWidth);
        var levelTextWidth = this.levelTextWidth + 10;
        return (levelTextWidth < lastColumnWidth);
    };
    Bar.prototype.doesLevelTextFitInCapColumn = function () {
        var capColumnWidth = this.percentageToPixels(this.capWidth);
        var levelTextWidth = this.levelTextWidth + 10;
        var overflow = this.labelTextWidth - this.percentageToPixels(this.capWidth);
        if (overflow > 0)
            capColumnWidth -= overflow;
        return (levelTextWidth < capColumnWidth);
    };
    Bar.prototype.doesLevelTextFitInLevelColumn = function () {
        var levelColumnWidth = this.percentageToPixels(this.levelTextWidth);
        var levelTextWidth = this.levelTextWidth + 10;
        var overflow = this.labelTextWidth - this.percentageToPixels(this.skillWidth);
        if (overflow > 0)
            levelColumnWidth -= overflow;
        return (levelTextWidth < levelColumnWidth);
    };
    Bar.prototype.getPadding = function () {
        if ((this._hostStyle.direction || "ltr") === "ltr") {
            return { "padding-left": this.numberPadding + "px" };
        }
        else {
            return { "padding-right": this.numberPadding + "px" };
        }
    };
    Bar.prototype.hostData = function () {
        return {
            "aria-label": this.label + ": " + (this.denomination || this.level + " / " + (this.cap || this.max)),
        };
    };
    Bar.prototype.render = function () {
        if (!this.didLoad)
            return (h("table", null));
        return (h("table", { class: {
                "level-text-dont-fit": this.forceLevelTextPosition,
                "has-cap-bar": this.hasCapBar(),
            } }, h("tr", null, h("td", { class: { "bar-level": true, "maxed": this.isCap }, style: { "width": this.skillWidth + "%" } }, h("span", { class: "title" }, this.label), this.denomination &&
            h("span", { class: "denomination" }, this.denomination), (this.showSkillInColumn === BarPart.Level) &&
            h("span", { class: "number" }, this.levelText)), this.hasCapBar() &&
            h("td", { class: "bar-cap", style: { "width": this.capWidth + "%" } }, (this.showSkillInColumn === BarPart.Cap) &&
                h("span", { class: "number" }, this.levelText)), this.hasMaxBar() &&
            h("td", { class: "bar-max", style: this.getPadding() }, (this.showSkillInColumn === BarPart.Max) &&
                h("span", { class: "number" }, this.levelText)))));
    };
    Object.defineProperty(Bar, "is", {
        get: function () { return "ht-bar"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bar, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bar, "properties", {
        get: function () {
            return {
                "cap": {
                    "type": Number,
                    "attr": "cap"
                },
                "capWidth": {
                    "state": true
                },
                "denomination": {
                    "type": String,
                    "attr": "denomination",
                    "reflectToAttr": true
                },
                "didLoad": {
                    "state": true
                },
                "forceLevelTextPosition": {
                    "state": true
                },
                "hideContent": {
                    "type": Boolean,
                    "attr": "hide-content"
                },
                "host": {
                    "elementRef": true
                },
                "isCap": {
                    "type": Boolean,
                    "attr": "is-cap"
                },
                "label": {
                    "type": String,
                    "attr": "label"
                },
                "labelTextWidth": {
                    "state": true
                },
                "lazy": {
                    "type": Boolean,
                    "attr": "lazy"
                },
                "level": {
                    "type": Number,
                    "attr": "level"
                },
                "levelText": {
                    "state": true
                },
                "levelTextWidth": {
                    "state": true
                },
                "max": {
                    "type": Number,
                    "attr": "max"
                },
                "numberPadding": {
                    "state": true
                },
                "showSkillInColumn": {
                    "state": true
                },
                "skillWidth": {
                    "state": true
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bar, "style", {
        get: function () { return ":host {\n  position: relative;\n  display: block;\n  font-size: 1em;\n  line-height: 1em; }\n\ntable {\n  table-layout: fixed;\n  width: 100%;\n  border-spacing: 0;\n  overflow: hidden; }\n\ntd {\n  height: calc(1em + 0.25em);\n  padding: 1px;\n  vertical-align: middle; }\n\ntd.bar-level {\n  background-color: var(--bar-level-background, #A9A9A9);\n  color: var(--bar-max-background, #ECECEC);\n  position: relative;\n  text-align: start; }\n\ntd.bar-level.maxed {\n  background-color: var(--bar-capped-background, #FFEB99);\n  color: var(--bar-level-background, #A9A9A9); }\n\ntd.bar-cap {\n  background-color: var(--bar-cap-background, #CACACA);\n  color: var(--bar-max-background, #ECECEC);\n  text-align: start; }\n\ntd.bar-max {\n  background-color: var(--bar-max-background, #ECECEC);\n  color: var(--bar-level-background, #A9A9A9); }\n\n.title {\n  color: var(--bar-title-color, #000000);\n  white-space: nowrap;\n  position: absolute;\n  top: 2px; }\n  :host([denomination]) .title {\n    width: 80px;\n    overflow: hidden; }\n  :host-context([dir=ltr]) .title {\n    left: 2px; }\n  :host-context([dir=rtl]) .title {\n    right: 2px; }\n\n.number {\n  display: inline-block;\n  margin-left: 5px;\n  margin-right: 5px;\n  white-space: nowrap; }\n\ntd.bar-level .number {\n  position: absolute;\n  top: 2px; }\n  :host-context([dir=ltr]) td.bar-level .number {\n    right: 0; }\n  :host-context([dir=rtl]) td.bar-level .number {\n    left: 0; }\n\n.level-text-dont-fit .bar-cap {\n  color: var(--bar-max-background, #ECECEC); }\n\n.level-text-dont-fit .bar-max {\n  color: var(--bar-cap-background, #CACACA); }\n\n.level-text-dont-fit.has-cap-bar.bar-max {\n  color: var(--bar-level-background, #A9A9A9); }\n\n.level-text-dont-fit .number {\n  position: absolute;\n  top: 2px; }\n  :host-context([dir=ltr]) .level-text-dont-fit .number {\n    right: 0; }\n  :host-context([dir=rtl]) .level-text-dont-fit .number {\n    left: 0; }\n\n.denomination {\n  position: absolute;\n  color: var(--bar-denomination-color, #000000);\n  white-space: nowrap;\n  top: 2px; }\n  :host-context([dir=ltr]) .denomination {\n    left: 85px; }\n  :host-context([dir=rtl]) .denomination {\n    right: 85px; }"; },
        enumerable: true,
        configurable: true
    });
    return Bar;
}(LazyLoadedComponent));
/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @½see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font) {
    // re-use canvas object for better performance
    var self = getTextWidth;
    var canvas = self.canvas || (self.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
var BarPart;
(function (BarPart) {
    BarPart[BarPart["None"] = -1] = "None";
    BarPart[BarPart["Level"] = 0] = "Level";
    BarPart[BarPart["Cap"] = 1] = "Cap";
    BarPart[BarPart["Max"] = 2] = "Max";
})(BarPart || (BarPart = {}));
export { Bar as HtBar };
