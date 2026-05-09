import { IClockTexts } from "./match-clock.interfaces";

export interface MatchClockDisplayOptions {
  texts?: Partial<IClockTexts>;
  addedMinutes?: number;
  halftimeBreak?: number;
  overtimeBreak?: number;
  ignoreBreaks?: boolean;
  finishedDate?: Date | string | number;
  skipPauseTimers?: boolean;
  countUpFormat?: string;
  now?: number;
}

export interface MatchClockClassState {
  passedZero: boolean;
}

interface ClockState {
  minutes: number;
  seconds: number;
  days: number;
  hours: number;
  labelAfterClock: string;
}

export function fixDate(date: Date | string | number): Date {
  if (!date) return new Date();

  if (Object.prototype.toString.call(date) === "[object Date]") return date as Date;
  if (!isNaN(date as any)) return new Date(parseInt(date.toString()));
  if (typeof date === "string") {
    return new Date(
      date.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/, "$1T$2:$3"),
    );
  }

  return date as any;
}

export function getMatchClockSeconds(
  matchdate: Date | string | number,
  now: number = Date.now(),
): number {
  return Math.ceil((fixDate(matchdate).getTime() - now) / 1000);
}

export function didPassFinishedDate(
  finishedDate?: Date | string | number,
  now: number = Date.now(),
): boolean {
  if (!finishedDate) return false;
  return now >= fixDate(finishedDate).getTime();
}

export function isMatchClockCountingDown(seconds: number): boolean {
  return seconds > 0;
}

export function getMatchClockClassState(seconds: number): MatchClockClassState {
  return {
    passedZero: !isMatchClockCountingDown(seconds),
  };
}

export function getMatchClockText(seconds: number, options: MatchClockDisplayOptions = {}): string {
  const { texts = {}, countUpFormat = "MM:SS" } = options;

  const clock = getClockState(seconds, options);

  if (isMatchClockCountingDown(seconds)) {
    let format = "MM SS";
    if (clock.days !== 0) format = "D H MM SS";
    else if (clock.hours !== 0) format = "H MM SS";

    return formatMatchClock(clock, format, texts);
  }

  return formatMatchClock(clock, countUpFormat) + clock.labelAfterClock;
}

function getClockState(totalSeconds: number, options: MatchClockDisplayOptions): ClockState {
  const {
    texts = {},
    addedMinutes = 0,
    halftimeBreak = 15,
    overtimeBreak = 5,
    ignoreBreaks = false,
    finishedDate,
    skipPauseTimers = false,
    now = Date.now(),
  } = options;

  let minutes = Math.floor(Math.abs(totalSeconds / 60));
  let seconds = Math.floor(Math.abs(totalSeconds % 60));
  let days = 0;
  let hours = 0;
  let labelAfterClock = "";

  if (isMatchClockCountingDown(totalSeconds)) {
    hours = Math.floor(minutes / 60);
    days = Math.floor(hours / 24);
    hours = hours % 24;
    minutes = minutes % 60;
    return { minutes, seconds, days, hours, labelAfterClock };
  }

  if (!ignoreBreaks) {
    const isInHalftimeBreak = minutes >= 45 && minutes < 45 + halftimeBreak;

    if (isInHalftimeBreak) {
      if (skipPauseTimers) {
        minutes = 45;
        seconds = 0;
      } else {
        if (texts.halftime) labelAfterClock = ` (${texts.halftime})`;
        minutes = 45 + halftimeBreak - minutes - 1;
        seconds = 60 - seconds;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
      }
    } else if (minutes >= 45 + halftimeBreak) {
      minutes -= halftimeBreak;
    }

    if (!didPassFinishedDate(finishedDate, now) && overtimeBreak > 0) {
      const isInOvertimeBreak =
        minutes >= 90 + addedMinutes && minutes < 90 + addedMinutes + overtimeBreak;

      if (isInOvertimeBreak) {
        if (skipPauseTimers) {
          minutes = 90;
          seconds = 0;
        } else {
          if (texts.overtimeBreak) {
            labelAfterClock = ` (${texts.overtimeBreak})`;
          }
          minutes = 90 + addedMinutes + overtimeBreak - minutes - 1;
          seconds = 60 - seconds;
          if (seconds === 60) {
            seconds = 0;
            minutes += 1;
          }
        }
      } else if (minutes >= 90 + addedMinutes + overtimeBreak) {
        if (texts.overtime) labelAfterClock = ` (${texts.overtime})`;
        minutes -= addedMinutes + overtimeBreak;
      }
    }
  }

  return { minutes, seconds, days, hours, labelAfterClock };
}

function formatMatchClock(
  clock: ClockState,
  format: string,
  texts: Partial<IClockTexts> = {},
): string {
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
    .replace("{0}", padLeft(clock.days) + (texts.days || ""))
    .replace("{1}", clock.days.toString() + (texts.days || ""))
    .replace("{2}", padLeft(clock.hours) + (texts.hours || ""))
    .replace("{3}", clock.hours.toString() + (texts.hours || ""))
    .replace("{4}", padLeft(clock.minutes) + (texts.minutes || ""))
    .replace("{5}", clock.minutes.toString() + (texts.minutes || ""))
    .replace("{6}", padLeft(clock.seconds) + (texts.seconds || ""))
    .replace("{7}", clock.seconds.toString() + (texts.seconds || ""));
}

function padLeft(val: number): string {
  if (val < 10) return "0" + val;
  return val.toString();
}
