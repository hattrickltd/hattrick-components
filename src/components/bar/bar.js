var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Prop, State } from '@stencil/core';
let Bar = class Bar {
    constructor() {
        /** The maximum level the bar should show. */
        this.maxLevel = 20;
        /** If there's a max before the end of the bar (e.g. maxed youth skill). */
        this.levelCap = 0;
        /** If the sublevel is the same as the levelCap. */
        this.isCap = false;
        /** The title shown inside the bar */
        this.title = "";
        /** The denomination of the skill level */
        this.denomination = "";
        /** The text for the level when denomination is not used */
        this.levelText = "";
        this.showSkillInColumn = 2;
    }
    componentWillLoad() {
        this._hostStyle = window.getComputedStyle(this.host, null);
        this.calculatePartWidths();
        console.log(this._hostStyle.width);
    }
    calculatePartWidths() {
        let skillWidth = this.getSkillWidth();
        let capWidth = this.getCapWidth();
        let numberPadding = this.getNumberPadding();
        this.levelText = this.getLevelText();
        if (this.denomination)
            this.showSkillInColumn = BarPart.None;
        else if (this.doesLevelTextFitInLastColumn())
            this.showSkillInColumn = BarPart.Max;
        else if (this.doesLevelTextFitInCapColumn())
            this.showSkillInColumn = BarPart.Cap;
        else
            this.showSkillInColumn = BarPart.Level;
        let cells = this.host.getElementsByTagName("td");
        if (this.isCap)
            cells[0].classList.add("maxed");
        cells[0].style.width = `${skillWidth}%`;
        if (this.hasCapBar()) {
            cells[1].style.width = `${capWidth}%`;
        }
        if (this.hasMaxBar()) {
            cells[cells.length - 1].style.paddingLeft = `${numberPadding}px`;
        }
    }
    /** Convert percentage width to actual width based on the component width */
    getActualWidth(percentage) {
        if (percentage > 1)
            percentage /= 100;
        let clientWidth = this.host.clientWidth;
        return clientWidth * percentage;
    }
    /** Get the percentage width of the skill column */
    getSkillWidth() {
        if (this.level <= 0)
            return 0;
        else if (this.level > this.maxLevel)
            return 100;
        else
            return this.level / this.maxLevel * 100;
    }
    /** Get the percentage width of the cap column */
    getCapWidth() {
        if (!this.hasCapBar())
            return 0;
        return (this.levelCap / this.maxLevel * 100) - this.getSkillWidth();
    }
    /** Get how much padding the skill text should have (in case skill label `name` is longer than skill column + cap column) */
    getNumberPadding() {
        let textWidth = getTextWidth(this.denomination, this._hostStyle.font);
        let paddingLeft = 0;
        let skillWidth = this.getActualWidth(this.getSkillWidth() + this.getCapWidth());
        if (skillWidth < textWidth) {
            paddingLeft = textWidth - skillWidth + 5;
        }
        return paddingLeft;
    }
    getLevelText() {
        if (this.levelCap > 0) {
            return `${this.getSkillNumberText(this.level)} / ${this.getSkillNumberText(this.levelCap)}`;
        }
        else {
            return this.getSkillNumberText(this.level);
        }
    }
    getSkillNumberText(level) {
        if (level < 0) {
            return "-";
        }
        else if (level > this.maxLevel) {
            return `${this.maxLevel} (+${level - this.maxLevel})`;
            // return "20 (+" + (level - 20) + ")";
        }
        else {
            return level.toString();
        }
    }
    hasCapBar() {
        return this.levelCap > 0 && this.levelCap !== this.level;
    }
    hasMaxBar() {
        return this.level < this.maxLevel && this.levelCap < this.maxLevel;
    }
    doesLevelTextFitInLastColumn() {
        const lastColumnWidth = this.getActualWidth(100 - this.getCapWidth() - this.getSkillWidth());
        const levelTextWidth = getTextWidth(this.denomination, this._hostStyle.font);
        return (levelTextWidth < lastColumnWidth);
    }
    doesLevelTextFitInCapColumn() {
        let capColumnWidth = this.getActualWidth(this.getCapWidth());
        let levelTextWidth = getTextWidth(this.denomination, this._hostStyle.font);
        let skillTextWidth = getTextWidth(this.title, this._hostStyle.font);
        let overflow = skillTextWidth - this.getActualWidth(this.getSkillWidth());
        if (overflow > 0)
            capColumnWidth -= overflow;
        return (levelTextWidth < capColumnWidth);
    }
    render() {
        return (h("table", null,
            h("tr", null,
                h("td", { class: "bar-level" },
                    h("span", { class: "title" },
                        "$",
                        this.title),
                    this.denomination &&
                        h("span", { class: "denomination" },
                            "$",
                            this.denomination),
                    this.showSkillInColumn === BarPart.Level &&
                        h("span", { class: "number" },
                            "$",
                            this.levelText)),
                this.hasCapBar() &&
                    h("td", { class: "bar-cap" }, this.showSkillInColumn === BarPart.Cap &&
                        h("span", { class: "number" },
                            "$",
                            this.levelText)),
                this.hasMaxBar() &&
                    h("td", { class: "bar-max" }, this.showSkillInColumn === BarPart.Max &&
                        h("span", { class: "number" },
                            "$",
                            this.levelText)))));
    }
};
__decorate([
    Element()
], Bar.prototype, "host", void 0);
__decorate([
    Prop()
], Bar.prototype, "level", void 0);
__decorate([
    Prop()
], Bar.prototype, "maxLevel", void 0);
__decorate([
    Prop()
], Bar.prototype, "levelCap", void 0);
__decorate([
    Prop()
], Bar.prototype, "isCap", void 0);
__decorate([
    Prop()
], Bar.prototype, "title", void 0);
__decorate([
    Prop()
], Bar.prototype, "denomination", void 0);
__decorate([
    State()
], Bar.prototype, "levelText", void 0);
__decorate([
    State()
], Bar.prototype, "showSkillInColumn", void 0);
Bar = __decorate([
    Component({
        tag: 'ht-bar',
        styleUrl: 'bar.css',
        shadow: true
    })
], Bar);
export { Bar };
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
