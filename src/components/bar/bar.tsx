import { h, Host, Component, Prop } from "@stencil/core";

@Component({
  tag: "hattrick-bar",
  styleUrl: "bar.css",
  shadow: true,
})
export class Bar {
  /** The level of the bar. */
  @Prop() level: number;
  /** The maximum level the bar should show. */
  @Prop() max: number = 20;
  /** If there's a max before the end of the bar (e.g. maxed youth skill). */
  @Prop() cap: number = 0;
  /** If the sublevel is the same as the levelCap. */
  @Prop() isCap: boolean = false;

  /** The denomination of the skill level */
  @Prop({ reflectToAttr: true }) denomination: string = "";

  render() {
    const skillWidth = this.getSkillWidth();
    const capWidth = this.getCapWidth();

    return (
      <Host aria-label={ this.denomination || `${this.level} / ${this.cap || this.max}` }>
        { this.level !== this.max &&
          <div class="max" style={{ "width": `100%` }}>{ this.denomination }</div>
        }
        { capWidth >= 1 &&
          <div class="cap" style={{ "width": `${ capWidth }%` }}>{ this.denomination }</div>
        }
        { skillWidth >= 1 &&
          <div class={{ "level": true, "capped": this.isCap }} style={{ "width": `${ skillWidth }%`}}>{ this.denomination }</div>
        }
      </Host>
    );
  }

  
  /** Get the percentage width of the skill column */
  private getSkillWidth(): number {
    if (this.level <= 0) return 0;
    if (this.level > this.max) return 100;
    return this.level / this.max * 100;
  }

  /** Get the percentage width of the cap column */
  private getCapWidth(): number {
    if (!this.hasCapBar()) return 0;
    return this.cap / this.max * 100;
  }

  private hasCapBar(): boolean {
    return this.cap > 0 && this.cap !== this.level;
  }
}
