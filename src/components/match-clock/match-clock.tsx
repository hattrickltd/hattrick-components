import { Component, Prop, State, Watch, Method } from "@stencil/core";

@Component({
  tag: "hattrick-match-clock",
  styleUrl: "match-clock.scss",
  shadow: true,
})
export class MatchClock {

  private _matchstart: number;
  private _interval;

  /** Positive value means we're counting down towards 0. */
  @State() private seconds: number;

  /** Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match.. */
  @Prop() texts: {
    days: string,
    hours: string,
    minutes: string,
    seconds: string,
    halftime: string,
    overtimeBreak: string,
    overtime: string,
  } = {} as any;

  /** At what time the match starts. */
  @Prop({ mutable: true }) matchtime: Date | string | number;

  /** How many minutes of added time the match has. */
  @Prop() addedMinutes: number = 0;

  /** How many minutes break does the match have between first and second half. */
  @Prop() halftimeBreak: number = 15;

  /** How many minutes break does the match have before overtime starts. */
  @Prop() overtimeBreak: number = 5;

  /** If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false. */
  @Prop() ignoreBreaks: boolean = false;

  componentWillLoad() {
    this.matchtimeUpdated();
    this._interval = setInterval(() => this.updateTime(), 1000);
  }

  componentDidUnload() {
    this._interval && clearInterval(this._interval);
  }

  @Watch("matchtime")
  private matchtimeUpdated() {
    this._matchstart = fixDate(this.matchtime).getTime();
    if (this._pauseTime) this._pauseTime = Date.now();
    this.updateTime();
  }

  private _pauseTime;
  @Method()
  async pause() {
    this._pauseTime = Date.now();
    this._interval && clearInterval(this._interval);
  }

  @Method()
  async resume() {
    if (this._pauseTime) {
      this.matchtime = fixDate(this.matchtime).getTime() + (Date.now() - this._pauseTime);
      this._pauseTime = undefined;
    }
    this._interval = setInterval(() => this.updateTime(), 1000);
  }

  private updateTime() {
    if (this._pauseTime) return;

    this.seconds = Math.floor((this._matchstart - Date.now()) / 1000);
  }

  private isCountingDown(): boolean {
    return this.seconds > 0;
  }

  private getTime(): string {

    let format = "";
    let clock = this.getMatchClock();

    if (this.isCountingDown()) {
      let t = this.texts;

      if (clock.days !== 0) format = "D H MM SS";
      else if (clock.hours !== 0) format = "H MM SS";
      else format = "MM SS";

      return format
        .replace("D", clock.days.toString() + (t.days || ""))
        .replace("H", clock.hours.toString() + (t.hours || ""))
        .replace("MM", this.padLeft(clock.minutes) + (t.minutes || ""))
        .replace("SS", this.padLeft(clock.seconds) + (t.seconds || ""));
    } else {
      return this.padLeft(clock.minutes) + ":" + this.padLeft(clock.seconds) + clock.labelAfterClock;
    }
  }

  private getMatchClock(): { minutes: number, seconds: number, days: number, hours: number, labelAfterClock: string } {

    let minutes = 0, seconds = 0, days = 0, hours = 0, labelAfterClock = "";

    minutes = Math.floor(Math.abs(this.seconds / 60));
    seconds = Math.floor(Math.abs(this.seconds % 60));

    if (this.isCountingDown()) {
      hours = Math.floor(minutes / 60);
      days = Math.floor(hours / 24);
      hours = hours % 24;
      minutes = minutes % 60;
    } else {
      if (!this.ignoreBreaks) {
        if (minutes >= 45 && minutes < 45 + this.halftimeBreak) {
          // is in halftime
          if (this.texts.halftime) labelAfterClock = " (" + this.texts.halftime + ")";
          minutes = 45 + this.halftimeBreak - minutes - 1;
          seconds = 60 - seconds;
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }
        } else if (minutes >= 45 + this.halftimeBreak) {
          // is in second half
          minutes -= this.halftimeBreak;
        }

        if (this.overtimeBreak > 0) {
          if (minutes >= 90 + this.addedMinutes && minutes < 90 + this.addedMinutes + this.overtimeBreak) {
            // is in overtime break
            if (this.texts.overtimeBreak) labelAfterClock = " (" + this.texts.overtimeBreak + ")";
            minutes = 90 + this.addedMinutes + this.overtimeBreak - minutes - 1;
            seconds = 60 - seconds;
            if (seconds === 60) {
              seconds = 0;
              minutes += 1;
            }
          } else if (minutes >= 90 + this.addedMinutes + this.overtimeBreak) {
            // is in overtime
            if (this.texts.overtime) labelAfterClock = " (" + this.texts.overtime + ")";
            minutes -= (this.addedMinutes + this.overtimeBreak);
          }
        }
      }
    }

    return { minutes, seconds, days, hours, labelAfterClock };
  }

  private padLeft(val: number): string {
    if (val < 10) return "0" + val;
    else return val.toString();
  }

  hostData() {
    return {
      "role": "timer",
      "class": {
        "match-clock-passed-zero": !this.isCountingDown(),
      }
    };
  }

  render() {
    return (
      <span>
        { this.getTime() }
      </span>
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
