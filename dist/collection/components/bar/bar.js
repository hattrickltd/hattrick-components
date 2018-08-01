var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { LazyLoadedComponent } from "../../global/lazy-loaded-component";
export class Bar extends LazyLoadedComponent {
    constructor() {
        super(...arguments);
        /** The maximum level the bar should show. */
        this.max = 20;
        /** If there's a max before the end of the bar (e.g. maxed youth skill). */
        this.cap = 0;
        /** If the sublevel is the same as the levelCap. */
        this.isCap = false;
        /** The label shown inside the bar */
        this.label = "";
        /** The denomination of the skill level */
        this.denomination = "";
        this.hideContent = false;
        /** Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport */
        this.lazy = true;
        /** The text for the level when denomination is not used */
        this.levelText = "";
        /** Which column the skill level should be shown in. */
        this.showSkillInColumn = BarPart.Max;
        /** The width of the label text */
        this.labelTextWidth = 0;
        /** The width of the level text */
        this.levelTextWidth = 0;
        /** If the level text doesn't fit anywhere, we need to force it in. */
        this.forceLevelTextPosition = false;
        this.didLoad = false;
    }
    get totalWidth() {
        return this.host.clientWidth;
    }
    componentWillLoad() {
        const _super = name => super[name];
        return __awaiter(this, void 0, void 0, function* () {
            this._hostStyle = window.getComputedStyle(this.host, null);
            yield (this.lazy
                ? _super("lazyLoad").call(this, this.host)
                : Promise.resolve());
            this.didLoad = true;
            this.setCalculations(false);
        });
    }
    componentDidLoad() {
        if (!this.didLoad)
            return;
        this.setCalculations();
    }
    componentWillUpdate() {
        if (!this.didLoad)
            return;
        this.setCalculations();
    }
    setCalculations(didLoad = true) {
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
    }
    /** Convert percentage width to actual width based on the component width */
    percentageToPixels(percentage) {
        if (percentage > 1)
            percentage /= 100;
        return this.totalWidth * percentage;
    }
    /** Get the percentage width of the skill column */
    getSkillWidth() {
        if (this.level <= 0)
            return 0;
        else if (this.level > this.max)
            return 100;
        else
            return this.level / this.max * 100;
    }
    /** Get the percentage width of the cap column */
    getCapWidth() {
        if (!this.hasCapBar())
            return 0;
        return (this.cap / this.max * 100) - this.skillWidth;
    }
    /** Get how much padding the skill text should have (in case skill label `name` is longer than skill column + cap column) */
    getNumberPadding() {
        let textWidth = this.labelTextWidth;
        let paddingLeft = 0;
        let skillWidth = this.percentageToPixels(this.skillWidth + this.capWidth);
        if (skillWidth < textWidth) {
            paddingLeft = textWidth - skillWidth + 5;
        }
        return paddingLeft;
    }
    getLevelText() {
        if (this.cap > 0) {
            return `${this.getSkillNumberText(this.level)} / ${this.cap}`;
        }
        else {
            return this.getSkillNumberText(this.level);
        }
    }
    getSkillNumberText(level) {
        if (level < 0) {
            return "-";
        }
        else if (level > this.max) {
            return `${this.max} (+${level - this.max})`;
            // return "20 (+" + (level - 20) + ")";
        }
        else {
            return level.toString();
        }
    }
    hasCapBar() {
        return this.cap > 0 && this.cap !== this.level;
    }
    hasMaxBar() {
        return this.level < this.max && this.cap < this.max;
    }
    doesLevelTextFitInMaxColumn() {
        // const numberEl = this._root.querySelectorAll(".number")[0];
        // const numberStyle = window.getComputedStyle(numberEl, null);
        // const spacing = numberStyle.marginLeft + numberStyle.marginRight + numberStyle.paddingLeft + numberStyle.paddingRight;
        const lastColumnWidth = this.percentageToPixels(100 - this.capWidth - this.skillWidth);
        const levelTextWidth = this.levelTextWidth + 10;
        return (levelTextWidth < lastColumnWidth);
    }
    doesLevelTextFitInCapColumn() {
        let capColumnWidth = this.percentageToPixels(this.capWidth);
        let levelTextWidth = this.levelTextWidth + 10;
        let overflow = this.labelTextWidth - this.percentageToPixels(this.capWidth);
        if (overflow > 0)
            capColumnWidth -= overflow;
        return (levelTextWidth < capColumnWidth);
    }
    doesLevelTextFitInLevelColumn() {
        let levelColumnWidth = this.percentageToPixels(this.levelTextWidth);
        let levelTextWidth = this.levelTextWidth + 10;
        let overflow = this.labelTextWidth - this.percentageToPixels(this.skillWidth);
        if (overflow > 0)
            levelColumnWidth -= overflow;
        return (levelTextWidth < levelColumnWidth);
    }
    getPadding() {
        if ((this._hostStyle.direction || "ltr") === "ltr") {
            return { "padding-left": this.numberPadding + "px" };
        }
        else {
            return { "padding-right": this.numberPadding + "px" };
        }
    }
    hostData() {
        return {
            "aria-label": this.label + ": " + (this.denomination || `${this.level} / ${this.cap || this.max}`),
        };
    }
    render() {
        if (!this.didLoad)
            return (h("table", null));
        return (h("table", { class: {
                "level-text-dont-fit": this.forceLevelTextPosition,
                "has-cap-bar": this.hasCapBar(),
            } },
            h("tr", null,
                h("td", { class: { "bar-level": true, "maxed": this.isCap }, style: { "width": this.skillWidth + "%" } },
                    h("span", { class: "title" }, this.label),
                    this.denomination &&
                        h("span", { class: "denomination" }, this.denomination),
                    (this.showSkillInColumn === BarPart.Level) &&
                        h("span", { class: "number" }, this.levelText)),
                this.hasCapBar() &&
                    h("td", { class: "bar-cap", style: { "width": this.capWidth + "%" } }, (this.showSkillInColumn === BarPart.Cap) &&
                        h("span", { class: "number" }, this.levelText)),
                this.hasMaxBar() &&
                    h("td", { class: "bar-max", style: this.getPadding() }, (this.showSkillInColumn === BarPart.Max) &&
                        h("span", { class: "number" }, this.levelText)))));
    }
    static get is() { return "ht-bar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
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
    }; }
    static get style() { return "/**style-placeholder:ht-bar:**/"; }
}
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
    const self = getTextWidth;
    const canvas = self.canvas || (self.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
}
var BarPart;
(function (BarPart) {
    BarPart[BarPart["None"] = -1] = "None";
    BarPart[BarPart["Level"] = 0] = "Level";
    BarPart[BarPart["Cap"] = 1] = "Cap";
    BarPart[BarPart["Max"] = 2] = "Max";
})(BarPart || (BarPart = {}));
