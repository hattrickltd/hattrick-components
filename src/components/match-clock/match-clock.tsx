import { h, Component, Prop, State, Watch, Method, Host } from "@stencil/core";
import { IClockTexts } from "./match-clock.interfaces";

@Component({
  tag: "hattrick-match-clock",
  styleUrl: "match-clock.css",
  shadow: true,
})
export class MatchClock {
  private _matchstart: number;
  private _interval;

  /** Positive value means we're counting down towards 0. */
  @State() private seconds: number;

  /** Various strings for localizing. Days, hours, minutes and seconds are used pre-match. Halftime, overtimeBreak and overtime post match. */
  @Prop() texts: IClockTexts = {} as any;

  /** At what time the match starts. */
  @Prop({ mutable: true }) matchdate: Date | string | number;

  /**
   * At what time the timer should stop.
   * If not set, it will continue forever.
   * If paused, the finishedDate will be pushed forward.
   */
  @Prop({ mutable: true }) finishedDate?: Date | string | number;

  /** How many minutes of added time the match has. */
  @Prop() addedMinutes: number = 0;

  /** How many minutes break does the match have between first and second half. */
  @Prop() halftimeBreak: number = 15;

  /** How many minutes break does the match have before overtime starts. */
  @Prop() overtimeBreak: number = 5;

  /** If we should ignore halftime and overtime breaks when calculating the time shown. Defaults to false. */
  @Prop() ignoreBreaks: boolean = false;

  /** How fast the clock should tick. Defaults to 1. 2 means twice as fast. */
  @Prop() speed: number = 1;

  @Prop() countUpFormat: string = "MM:SS";

  connectedCallback() {
    this.matchdateUpdated();
    this.resume();
  }

  disconnectedCallback() {
    this._interval && clearInterval(this._interval);
  }

  @Watch("matchdate")
  protected matchdateUpdated() {
    this._matchstart = fixDate(this.matchdate).getTime();
    if (this._pauseTime) this._pauseTime = Date.now();
    this.updateTime();
  }

  @Watch("speed")
  protected speedUpdated() {
    if (this.speed > 0) {
      this.resume();
    }
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
      this.matchdate =
        fixDate(this.matchdate).getTime() + (Date.now() - this._pauseTime);

      if (this.finishedDate) {
        this.finishedDate =
          fixDate(this.finishedDate).getTime() + (Date.now() - this._pauseTime);
      }

      this._pauseTime = undefined;
    }
    this._interval && clearInterval(this._interval);

    let interval = 1000;
    if (this.speed > 1) interval = 100;

    this._interval = setInterval(() => {
      if (this.speed > 1) {
        this._matchstart -= interval * (this.speed - 1);
      }

      if (this.didPassFinishedDate()) {
        this.seconds = Math.ceil(
          (this._matchstart - fixDate(this.finishedDate).getTime()) / 1000,
        );
        clearInterval(this._interval);
      } else {
        this.updateTime();
      }
    }, interval);
  }

  private didPassFinishedDate() {
    if (!this.finishedDate) return false;
    return Date.now() >= fixDate(this.finishedDate).getTime();
  }

  private updateTime() {
    this.seconds = Math.ceil((this._matchstart - Date.now()) / 1000);
  }

  private isCountingDown(): boolean {
    return this.seconds > 0;
  }

  private getTime(): string {
    let format = "";
    let clock = this.getMatchClock();

    if (this.isCountingDown()) {
      if (clock.days !== 0) format = "D H MM SS";
      else if (clock.hours !== 0) format = "H MM SS";
      else format = "MM SS";

      return this.format(clock, format, this.texts);
    } else {
      return this.format(clock, this.countUpFormat) + clock.labelAfterClock;
    }
  }

  private getMatchClock(): IClock {
    let minutes = 0,
      seconds = 0,
      days = 0,
      hours = 0,
      labelAfterClock = "";

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
          if (this.texts.halftime)
            labelAfterClock = " (" + this.texts.halftime + ")";
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

        if (!this.didPassFinishedDate()) {
          if (this.overtimeBreak > 0) {
            if (
              minutes >= 90 + this.addedMinutes &&
              minutes < 90 + this.addedMinutes + this.overtimeBreak
            ) {
              // is in overtime break
              if (this.texts.overtimeBreak)
                labelAfterClock = " (" + this.texts.overtimeBreak + ")";
              minutes =
                90 + this.addedMinutes + this.overtimeBreak - minutes - 1;
              seconds = 60 - seconds;
              if (seconds === 60) {
                seconds = 0;
                minutes += 1;
              }
            } else if (minutes >= 90 + this.addedMinutes + this.overtimeBreak) {
              // is in overtime
              if (this.texts.overtime)
                labelAfterClock = " (" + this.texts.overtime + ")";
              minutes -= this.addedMinutes + this.overtimeBreak;
            }
          }
        }
      }
    }

    return { minutes, seconds, days, hours, labelAfterClock };
  }

  private format(
    clock: IClock,
    format: string,
    texts: IClockTexts = {} as any,
  ): string {
    // if texts contains these letters, it'll break unless we reformat it first
    format = format
      .replace("DD", "{0}")
      .replace("D", "{1}")
      .replace("HH", "{2}")
      .replace("H", "{3}")
      .replace("MM", "{4}")
      .replace("M", "{5}")
      .replace("SS", "{6}")
      .replace("S", "{7}");

    return format
      .replace("{0}", this.padLeft(clock.days) + (texts.days || ""))
      .replace("{1}", clock.days.toString() + (texts.days || ""))
      .replace("{2}", this.padLeft(clock.hours) + (texts.hours || ""))
      .replace("{3}", clock.hours.toString() + (texts.hours || ""))
      .replace("{4}", this.padLeft(clock.minutes) + (texts.minutes || ""))
      .replace("{5}", clock.minutes.toString() + (texts.minutes || ""))
      .replace("{6}", this.padLeft(clock.seconds) + (texts.seconds || ""))
      .replace("{7}", clock.seconds.toString() + (texts.seconds || ""));
  }

  private padLeft(val: number): string {
    if (val < 10) return "0" + val;
    else return val.toString();
  }

  render() {
    let time = this.getTime();

    let isCountdown = this.isCountingDown();

    return (
      <Host
        class={{
          "match-clock-passed-zero": !isCountdown,
        }}
      >
        <span innerHTML={time} dir={!isCountdown ? "ltr" : null}></span>
      </Host>
    );
  }
}

function fixDate(date: Date | string | number): Date {
  if (!date) return new Date();

  if (Object.prototype.toString.call(date) === "[object Date]")
    return date as Date;
  if (!isNaN(date as any)) return new Date(parseInt(date.toString()));
  if (typeof date === "string")
    return new Date(
      date.replace(
        /(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/,
        "$1T$2:$3",
      ),
    );

  return date as any;
}

interface IClock {
  minutes: number;
  seconds: number;
  days: number;
  hours: number;
  labelAfterClock: string;
}
