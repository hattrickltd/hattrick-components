import { describe, expect, it } from "vitest";

import {
  didPassFinishedDate,
  fixDate,
  getMatchClockClassState,
  getMatchClockSeconds,
  getMatchClockText,
} from "./match-clock.logic";

const now = Date.parse("2026-05-09T12:00:00.000Z");

const hours = (n: number) => n * 1000 * 60 * 60;
const minutes = (m: number) => m * 1000 * 60;
const seconds = (s: number) => s * 1000;

const texts = {
  days: "d",
  hours: "h",
  minutes: "m",
  seconds: "s",
  overtime: "Overtime",
  overtimeBreak: "Overtime break",
  halftime: "Half time",
};

function getText(matchdate: Date | string | number, options: Record<string, unknown> = {}) {
  return getMatchClockText(getMatchClockSeconds(matchdate, now), { now, ...options });
}

describe("match-clock.logic", () => {
  describe("getMatchClockSeconds", () => {
    it("returns 0 when matchtime is now", () => {
      expect(getMatchClockSeconds(now, now)).toBe(0);
    });

    it("returns a negative value when matchtime is in the past", () => {
      expect(getMatchClockSeconds(now - seconds(10), now)).toBeLessThan(0);
    });

    it("returns a positive value when matchtime is in the future", () => {
      expect(getMatchClockSeconds(now + seconds(10), now)).toBeGreaterThan(0);
    });
  });

  describe("during match", () => {
    it("shows 00:00 when matchtime is now", () => {
      expect(getText(now)).toBe("00:00");
    });

    it("shows 00:11 when matchtime was 11 seconds ago", () => {
      expect(getText(now - seconds(11))).toBe("00:11");
    });

    it("shows 01:01 when matchtime was 61 seconds ago", () => {
      expect(getText(now - seconds(61))).toBe("01:01");
    });

    it("shows countdown during halftime", () => {
      expect(getText(now - minutes(45))).toBe("15:00");
    });

    it("shows 45:00 when second half starts", () => {
      expect(getText(now - minutes(60))).toBe("45:00");
    });

    it("shows countdown during overtime break", () => {
      expect(getText(now - minutes(105))).toBe("05:00");
    });

    it("shows 90:00 when overtime starts", () => {
      expect(getText(now - minutes(110))).toBe("90:00");
    });

    it("shows 90:00 instead of countdown for overtime break with added minutes", () => {
      expect(getText(now - minutes(105), { addedMinutes: 3 })).toBe("90:00");
    });

    it("shows countdown after 93 minutes of match time", () => {
      expect(getText(now - minutes(108), { addedMinutes: 3 })).toBe("05:00");
    });

    it("shows 90:00 again when overtime starts after added minutes", () => {
      expect(getText(now - minutes(113), { addedMinutes: 3 })).toBe("90:00");
    });

    it("adds halftime label text", () => {
      expect(getText(now - minutes(45), { texts })).toBe("15:00 (Half time)");
    });

    it("adds overtime break label text", () => {
      expect(getText(now - minutes(105), { texts })).toBe("05:00 (Overtime break)");
    });

    it("adds overtime label text", () => {
      expect(getText(now - minutes(110), { texts })).toBe("90:00 (Overtime)");
    });
  });

  describe("before match", () => {
    it("shows days, hours, minutes and seconds", () => {
      expect(getText(now + hours(25), { texts })).toBe("1d 1h 00m 00s");
    });

    it("shows hours, minutes and seconds", () => {
      expect(getText(now + hours(1), { texts })).toBe("1h 00m 00s");
    });

    it("shows minutes and seconds", () => {
      expect(getText(now + minutes(1), { texts })).toBe("01m 00s");
    });

    it("shows seconds", () => {
      expect(getText(now + seconds(1), { texts })).toBe("00m 01s");
    });
  });

  describe("helpers", () => {
    it("marks passed-zero when the match has started", () => {
      expect(getMatchClockClassState(0)).toEqual({ passedZero: true });
    });

    it("does not mark passed-zero for upcoming matches", () => {
      expect(getMatchClockClassState(1)).toEqual({ passedZero: false });
    });

    it("detects when a finished date has passed", () => {
      expect(didPassFinishedDate(now - seconds(1), now)).toBe(true);
      expect(didPassFinishedDate(now + seconds(1), now)).toBe(false);
    });

    it("returns the original Date instance for Date values", () => {
      const date = new Date(now + seconds(5));

      expect(fixDate(date)).toBe(date);
    });
  });
});
