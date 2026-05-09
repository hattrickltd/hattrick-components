export interface TimerTextOptions {
  daysText?: string;
  keepCounting?: boolean;
  maxHours?: number;
  pattern?: string;
}

export interface TimerClassState {
  finished: boolean;
  passedZero: boolean;
}

export function fixDate(date: Date | string | number): Date {
  if (!date) return new Date();

  if (Object.prototype.toString.call(date) === "[object Date]") {
    return date as Date;
  }

  if (!isNaN(date as any)) {
    return new Date(parseInt(date.toString()));
  }

  if (typeof date === "string") {
    return new Date(
      date.replace(/(\d{4}-\d{2}-\d{2}).(\d{2}:\d{2}:\d{2}.*?\+\d{2}).?(\d{2})/, "$1T$2:$3"),
    );
  }

  return date as any;
}

export function getTimerSeconds(
  deadline: Date | string | number,
  now: number = Date.now(),
): number {
  return Math.floor((fixDate(deadline).getTime() - now) / 1000);
}

export function getTimerClassState(
  seconds: number,
  keepCounting: boolean = false,
): TimerClassState {
  return {
    finished: !keepCounting && seconds <= 0,
    passedZero: keepCounting && seconds < 0,
  };
}

export function getTimerText(seconds: number, options: TimerTextOptions = {}): string {
  const { daysText = "days", keepCounting = false, maxHours = 72, pattern = "HH:MM:SS" } = options;

  if (seconds > maxHours * 60 * 60) {
    const days = Math.floor(seconds / 24 / 60 / 60);
    return `${days} ${daysText}`;
  }

  if (seconds >= 0) {
    return formatTime(seconds, pattern);
  }

  if (keepCounting) {
    return formatTime(-seconds, pattern);
  }

  return "00:00:00";
}

function padLeft(val: number): string {
  if (val < 10) return "0" + val;
  return val.toString();
}

function formatTime(totalSeconds: number, pattern: string): string {
  const hours = Math.floor(totalSeconds / 60 / 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const seconds = Math.floor(totalSeconds % 60);

  let result = pattern
    .replace("hh", hours > 0 ? padLeft(hours) : "")
    .replace("h", hours > 0 ? hours.toString() : "")
    .replace("HH", padLeft(hours))
    .replace("H", hours.toString())

    .replace("mm", hours > 0 || minutes > 0 ? padLeft(minutes) : "")
    .replace("m", hours > 0 ? padLeft(seconds) : minutes > 0 ? minutes.toString() : "")
    .replace("MM", padLeft(minutes))
    .replace("M", minutes.toString())

    .replace("ss", hours > 0 || minutes > 0 || seconds > 0 ? padLeft(seconds) : "")
    .replace(
      "s",
      hours > 0 || minutes > 0 ? padLeft(seconds) : seconds > 0 ? seconds.toString() : "",
    )
    .replace("SS", padLeft(seconds))
    .replace("S", seconds.toString());

  result = result.replace(/^\D*([\d:]*?)\D*$/, "$1");

  if (!/\D/.test(result)) {
    result = result.replace(/^0*/, "");
  }

  if (!/\d/.test(result)) {
    result = "0";
  }

  return result;
}
