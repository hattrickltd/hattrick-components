import { Component, Element, Prop, State } from "@stencil/core";
import { waitForIntersection } from "../../global/lazy-loading";

@Component({
  tag: "simple-bar",
  styleUrl: "simple-bar.scss",
  shadow: true,
})
export class Bar {
  /** The host (outer) element. E.g. <hattrick-bar> */
  @Element() private host: HTMLStencilElement;

  /** The level of the bar. */
  @Prop() level: number;
  /** The maximum level the bar should show. */
  @Prop() max: number = 20;
  /** If there's a max before the end of the bar (e.g. maxed youth skill). */
  @Prop() cap: number = 0;
  /** If the sublevel is the same as the levelCap. */
  @Prop() isCap: boolean = false;

  /** Set to false to load the bar directly, as opposed to loading it when it's visible within the viewport */
  @Prop() lazy?: boolean = true;

  /** The width of the skill level column. */
  @State() private skillWidth: number;
  /** The width of the cap column. */
  @State() private capWidth: number;

  @State() private didLoad: boolean = false;

  async componentWillLoad() {
    await (this.lazy
      ? waitForIntersection(this.host)
      : Promise.resolve()
    );

    this.didLoad = true;
    this.setCalculations();
  }

  componentDidLoad() {
    if (!this.didLoad) return;

    this.setCalculations();
  }
  componentWillUpdate() {
    if (!this.didLoad) return;

    this.setCalculations();
  }

  private setCalculations(): void {
    this.skillWidth = this.getSkillWidth();
    this.capWidth = this.getCapWidth();
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

  private hasCapBar(): boolean {
    return this.cap > 0 && this.cap !== this.level;
  }

  private hasMaxBar(): boolean {
    return this.level < this.max && this.cap < this.max;
  }

  hostData() {
    return {
      "aria-label": "Bla",
    };
  }

  render() {
    if (!this.didLoad) return (<table></table>);

    return (
      <table class={{
        "has-cap-bar": this.hasCapBar(),
      }}>
        <tr>
          <td class={{ "bar-level": true, "maxed": this.isCap }} style={{ "width": this.skillWidth + "%" }}>
          </td>
          {this.hasCapBar() &&
            <td class="bar-cap" style={{ "width": this.capWidth + "%" }}></td>
          }
          {this.hasMaxBar() &&
            <td class="bar-max"></td>
          }
        </tr>
      </table>
    );
  }
}
