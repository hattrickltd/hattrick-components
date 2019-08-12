import { h, Component, Prop, State, Watch, Host } from "@stencil/core";

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

  // /** The number of seconds left (or negative if `keepCounting` is set to `true`. */
  // @Prop({ reflectToAttr: true, mutable: true }) seconds: number;

  componentWillLoad() {
    this.deadlineUpdated();
    this._interval = setInterval(() => this.updateTime(), 1000);
  }

  componentDidUnload() {
    this._interval && clearInterval(this._interval);
  }

  @Watch("deadline")
  private deadlineUpdated() {
    this._deadline = fixDate(this.deadline).getTime();
    this.updateTime();
  }

  private updateTime() {
    this.seconds = Math.floor((this._deadline - Date.now()) / 1000);

    if (this.seconds <= 0 && !this.keepCounting) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  }

  private getTime(): string {
    if (this.shouldShowDaysText()) {
      const days = Math.floor(this.seconds / 24 / 60 / 60);
      return `${days} ${this.daysText}`;
    } else if (this.seconds >= 0) {
      const hours = Math.floor(this.seconds / 60 / 60);
      const minutes = Math.floor(this.seconds / 60 % 60);
      const seconds = Math.floor(this.seconds % 60);

      return this.format(hours, minutes, seconds);
    } else if (this.seconds < 0 && this.keepCounting) {
      const hours = Math.floor(-this.seconds / 60 / 60);
      const minutes = Math.floor(-this.seconds / 60 % 60);
      const seconds = Math.floor(-this.seconds % 60);

      return this.format(hours, minutes, seconds);
    } else {
      // no time left on the clock
      return "00:00:00";
    }
  }

  private shouldShowDaysText(): boolean {
    return this.seconds > this.maxHours * 60 * 60;
  }

  private padLeft(val: number): string {
    if (val < 10) return "0" + val;
    else return val.toString();
  }

  private format(hours: number, minutes: number, seconds: number): string {
    return `${this.padLeft(hours)}:${this.padLeft(minutes)}:${this.padLeft(seconds)}`;
  }

  render() {
    return (
      <Host role="timer" class={{
        "timer-passed-zero": this.keepCounting && this.seconds < 0,
        "timer-finished": !this.keepCounting && this.seconds <= 0,
      }}>
        { this.getTime() }
      </Host>
    );
  }
}

function fixDate(date: Date | string | number): Date {
  if (!date) return new Date();

  if (Object.prototype.toString.call(date) === "[object Date]") return date as Date;
  if (!isNaN(date as any)) return new Date(parseInt(date.toString()));
  if (typeof date === "string") return new Date(date.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/, "$1T$2:$3"));

  return date as any;
}
