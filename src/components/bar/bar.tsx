import { Component, Element, Prop, State } from "@stencil/core";

@Component({
  tag: "ht-bar",
  styleUrl: "bar.scss",
  shadow: true,
})
export class Bar {
  /** The styling of the host. Used to calculate text widths. */
  private _hostStyle: CSSStyleDeclaration;

  /** The host (outer) element. E.g. <ht-bar> */
  @Element() private host: HTMLElement;

  /** The level of the bar. */
  @Prop() level: number;
  /** The maximum level the bar should show. */
  @Prop() max: number = 20;
  /** If there's a max before the end of the bar (e.g. maxed youth skill). */
  @Prop() cap: number = 0;
  /** If the sublevel is the same as the levelCap. */
  @Prop() isCap: boolean = false;

  /** The label shown inside the bar */
  @Prop() label: string = "";
  /** The denomination of the skill level */
  @Prop({ reflectToAttr: true }) denomination: string = "";

  @Prop() hideContent: boolean = false;

  /** The text for the level when denomination is not used */
  @State() private levelText: string = "";

  /** Which column the skill level should be shown in. */
  @State() private showSkillInColumn: BarPart = BarPart.Max;

  /** The width of the skill level column. */
  @State() private skillWidth: number;
  /** The width of the cap column. */
  @State() private capWidth: number;
  /** How much padding the number need to not overlap with the label. */
  @State() private numberPadding: number;

  /** The width of the label text */
  @State() private labelTextWidth: number = 0;
  /** The width of the level text */
  @State() private levelTextWidth: number = 0;

  /** If the level text doesn't fit anywhere, we need to force it in. */
  @State() private forceLevelTextPosition: boolean = false;

  private get totalWidth(): number {
    return this.host.clientWidth;
  }

  componentWillLoad() {
    this._hostStyle = window.getComputedStyle(this.host, null);
    this.setCalculations(false);
  }

  componentDidLoad() {
    this.setCalculations();
  }
  componentWillUpdate() {
    this.setCalculations();
  }

  private setCalculations(didLoad = true): void {
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
          if (this.hasMaxBar()) this.showSkillInColumn = BarPart.Max;
          else if (this.hasCapBar()) this.showSkillInColumn = BarPart.Cap;
          else this.showSkillInColumn = BarPart.Level;
        }
      }
    }

    this.numberPadding = this.getNumberPadding();
  }

  /** Convert percentage width to actual width based on the component width */
  private percentageToPixels(percentage: number): number {
    if (percentage > 1) percentage /= 100;
    return this.totalWidth * percentage;
  }

  /** Get the percentage width of the skill column */
  private getSkillWidth(): number {
    if (this.level <= 0) return 0;
    else if (this.level > this.max) return 100;
    else return this.level / this.max * 100;
  }

  /** Get the percentage width of the cap column */
  private getCapWidth(): number {
    if (!this.hasCapBar()) return 0;
    return (this.cap / this.max * 100) - this.skillWidth;
  }

  /** Get how much padding the skill text should have (in case skill label `name` is longer than skill column + cap column) */
  private getNumberPadding(): number {
    let textWidth = this.labelTextWidth;

    let paddingLeft = 0;
    let skillWidth = this.percentageToPixels(this.skillWidth + this.capWidth);

    if (skillWidth < textWidth) {
      paddingLeft = textWidth - skillWidth + 5;
    }

    return paddingLeft;
  }

  private getLevelText(): string {
    if (this.cap > 0) {
      return `${this.getSkillNumberText(this.level)} / ${this.cap}`;
    } else {
      return this.getSkillNumberText(this.level);
    }
  }

  private getSkillNumberText(level: number): string {
    if (level < 0) {
      return "-";
    } else if (level > this.max) {
      return `${this.max} (+${level - this.max})`;
      // return "20 (+" + (level - 20) + ")";
    } else {
      return level.toString();
    }
  }

  private hasCapBar(): boolean {
    return this.cap > 0 && this.cap !== this.level;
  }

  private hasMaxBar(): boolean {
    return this.level < this.max && this.cap < this.max;
  }

  private doesLevelTextFitInMaxColumn(): boolean {
    // const numberEl = this._root.querySelectorAll(".number")[0];
    // const numberStyle = window.getComputedStyle(numberEl, null);
    // const spacing = numberStyle.marginLeft + numberStyle.marginRight + numberStyle.paddingLeft + numberStyle.paddingRight;

    const lastColumnWidth = this.percentageToPixels(100 - this.capWidth - this.skillWidth);
    const levelTextWidth = this.levelTextWidth + 10;

    console.log(levelTextWidth, lastColumnWidth, levelTextWidth < lastColumnWidth);

    return (levelTextWidth < lastColumnWidth);
  }
  private doesLevelTextFitInCapColumn(): boolean {
    let capColumnWidth = this.percentageToPixels(this.capWidth);
    let levelTextWidth = this.levelTextWidth + 10;

    let overflow = this.labelTextWidth - this.percentageToPixels(this.capWidth);
    if (overflow > 0) capColumnWidth -= overflow;

    return (levelTextWidth < capColumnWidth);
  }
  private doesLevelTextFitInLevelColumn(): boolean {
    let levelColumnWidth = this.percentageToPixels(this.levelTextWidth);
    let levelTextWidth = this.levelTextWidth + 10;

    let overflow = this.labelTextWidth - this.percentageToPixels(this.skillWidth);
    if (overflow > 0) levelColumnWidth -= overflow;

    return (levelTextWidth < levelColumnWidth);
  }

  getPadding() {
    if ((this._hostStyle.direction || "ltr") === "ltr") {
      return { "padding-left": this.numberPadding + "px" };
    } else {
      return { "padding-right": this.numberPadding + "px" };
    }
  }

  hostData() {
    return {
      "aria-label": this.label + ": " + (this.denomination || `${this.level} / ${this.cap || this.max}`),
    };
  }

  render() {
    return (
      <table class={{
        "level-text-dont-fit": this.forceLevelTextPosition,
        "has-cap-bar": this.hasCapBar(),
      }}>
        <tr>
          <td class={{ "bar-level": true, "maxed": this.isCap }} style={{ "width": this.skillWidth + "%" }}>
            <span class="title">{this.label}</span>
            {this.denomination &&
              <span class="denomination">{this.denomination}</span>
            }
            {(this.showSkillInColumn === BarPart.Level) &&
              <span class="number">{this.levelText}</span>
            }
          </td>
          {this.hasCapBar() &&
            <td class="bar-cap" style={{ "width": this.capWidth + "%" }}>
              {(this.showSkillInColumn === BarPart.Cap) &&
                <span class="number">{this.levelText}</span>
              }
            </td>
          }
          {this.hasMaxBar() &&
            <td class="bar-max" style={ this.getPadding() }>
              {(this.showSkillInColumn === BarPart.Max) &&
                <span class="number">{this.levelText}</span>
              }
            </td>
          }
        </tr>
      </table>
    );
  }
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param text The text to be rendered.
 * @param font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @½see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text: string, font: string): number {
  // re-use canvas object for better performance
  const self = (getTextWidth as any);
  const canvas = self.canvas || (self.canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

enum BarPart {
  None = -1,
  Level = 0,
  Cap = 1,
  Max = 2,
}
