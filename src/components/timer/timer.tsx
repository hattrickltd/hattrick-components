import { h, Component, Prop, State, Watch, Host } from "@stencil/core";

import { fixDate, getTimerClassState, getTimerSeconds, getTimerText } from "./timer.logic";

@Component({
  tag: "hattrick-timer",
  styleUrl: "timer.css",
  shadow: true,
})
export class Timer {
  private _deadline: number;
  private _interval;

  @State() private seconds: number;

  /** The string for `days` which is used if the deadline is more than 72 hours away. */
  @Prop() daysText: string = "days";

  /** At what time should the clock reach 00:00:00. */
  @Prop() deadline: Date | string | number;

  /** If the timer should start counting upwards again after reaching 0. */
  @Prop() keepCounting: boolean = false;

  /** After how many hours should it start showing _x days_. Change text via the `daysText` property. */
  @Prop() maxHours: number = 72;

  @Prop() pattern: string = "HH:MM:SS";

  // /** The number of seconds left (or negative if `keepCounting` is set to `true`. */
  // @Prop({ reflect: true, mutable: true }) seconds: number;

  componentWillLoad() {
    this.deadlineUpdated();
  }

  disconnectedCallback() {
    this._interval && clearInterval(this._interval);
  }

  @Watch("deadline")
  private deadlineUpdated() {
    this._deadline = fixDate(this.deadline).getTime();
    this.updateTime();
  }

  private updateTime() {
    this.seconds = getTimerSeconds(this._deadline);

    if (this.seconds <= 0 && !this.keepCounting) {
      this.clearInterval();
    } else if (!this._interval) {
      this.setupInterval();
    }
  }

  private setupInterval() {
    if (!this._interval) {
      this._interval = setInterval(() => this.updateTime(), 1000);
    }
  }
  private clearInterval() {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }

  private getTime(): string {
    return getTimerText(this.seconds, {
      daysText: this.daysText,
      keepCounting: this.keepCounting,
      maxHours: this.maxHours,
      pattern: this.pattern,
    });
  }

  render() {
    const classState = getTimerClassState(this.seconds, this.keepCounting);

    return (
      <Host
        role="timer"
        class={{
          "timer-passed-zero": classState.passedZero,
          "timer-finished": classState.finished,
        }}
      >
        {this.getTime()}
      </Host>
    );
  }
}
