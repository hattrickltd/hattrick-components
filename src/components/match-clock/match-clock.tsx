import { h, Component, Prop, State, Watch, Method, Host } from "@stencil/core";
import { IClockTexts } from "./match-clock.interfaces";
import {
  didPassFinishedDate,
  fixDate,
  getMatchClockClassState,
  getMatchClockSeconds,
  getMatchClockText,
  isMatchClockCountingDown,
} from "./match-clock.logic";

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

  /** If true there's no halftime or overtime countdowns, it just shows 45/90 during the pause. */
  @Prop() skipPauseTimers: boolean = false;

  /** Format of the timer. Defaults to `MM:SS`, an alternative might include `M'`. */
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
      this.matchdate = fixDate(this.matchdate).getTime() + (Date.now() - this._pauseTime);

      if (this.finishedDate) {
        this.finishedDate = fixDate(this.finishedDate).getTime() + (Date.now() - this._pauseTime);
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
        this.seconds = Math.ceil((this._matchstart - fixDate(this.finishedDate).getTime()) / 1000);
        clearInterval(this._interval);
      } else {
        this.updateTime();
      }
    }, interval);
  }

  private didPassFinishedDate() {
    return didPassFinishedDate(this.finishedDate);
  }

  private updateTime() {
    this.seconds = getMatchClockSeconds(this._matchstart);
  }

  private isCountingDown(): boolean {
    return isMatchClockCountingDown(this.seconds);
  }

  private getTime(): string {
    return getMatchClockText(this.seconds, {
      texts: this.texts,
      addedMinutes: this.addedMinutes,
      halftimeBreak: this.halftimeBreak,
      overtimeBreak: this.overtimeBreak,
      ignoreBreaks: this.ignoreBreaks,
      finishedDate: this.finishedDate,
      skipPauseTimers: this.skipPauseTimers,
      countUpFormat: this.countUpFormat,
    });
  }

  render() {
    let time = this.getTime();

    let isCountdown = this.isCountingDown();
    const classState = getMatchClockClassState(this.seconds);

    return (
      <Host
        class={{
          "match-clock-passed-zero": classState.passedZero,
        }}
      >
        <span innerHTML={time} dir={!isCountdown ? "ltr" : null}></span>
      </Host>
    );
  }
}
