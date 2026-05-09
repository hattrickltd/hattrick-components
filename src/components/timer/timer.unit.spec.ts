import { describe, expect, it } from "vitest";

import { fixDate, getTimerClassState, getTimerSeconds, getTimerText } from "./timer.logic";

const now = Date.parse("2026-05-09T12:00:00.000Z");

const hours = (n: number) => n * 1000 * 60 * 60;
const minutes = (n: number) => n * 1000 * 60;
const seconds = (n: number) => n * 1000;

function getText(deadline: Date | string | number, options = {}) {
  return getTimerText(getTimerSeconds(deadline, now), options);
}

describe("timer.logic", () => {
  describe("getTimerSeconds", () => {
    it("returns 0 when deadline is now", () => {
      expect(getTimerSeconds(now, now)).toBe(0);
    });

    it("returns a negative value when deadline is in the past", () => {
      expect(getTimerSeconds(now - seconds(10), now)).toBeLessThan(0);
    });

    it("returns a positive value when deadline is in the future", () => {
      expect(getTimerSeconds(now + seconds(10), now)).toBeGreaterThan(0);
    });

    it("accepts Date deadlines", () => {
      expect(getTimerSeconds(new Date(now + seconds(61)), now)).toBe(61);
    });

    it("accepts string numbers", () => {
      expect(getTimerSeconds((now + seconds(61)).toString(), now)).toBe(61);
    });

    it("accepts string Date deadlines", () => {
      expect(getTimerSeconds(new Date(now + seconds(61)).toISOString(), now)).toBe(61);
    });
  });

  describe("getTimerText", () => {
    it("shows 00:00:00 when deadline is now", () => {
      expect(getText(now)).toBe("00:00:00");
    });

    it("shows 00:00:11 when deadline is in 11 seconds", () => {
      expect(getText(now + seconds(11))).toBe("00:00:11");
    });

    it("shows 00:01:01 when deadline is in 61 seconds", () => {
      expect(getText(now + seconds(61))).toBe("00:01:01");
    });

    it("shows 01:01:01 when deadline is 1 hour and 61 seconds away", () => {
      expect(getText(now + hours(1) + minutes(1) + seconds(1))).toBe("01:01:01");
    });

    it("shows 24:00:00 when deadline is in 1 day", () => {
      expect(getText(now + hours(24))).toBe("24:00:00");
    });

    it("shows days text when over maxHours", () => {
      expect(getText(now + hours(24 * 4))).toBe("4 days");
    });

    it("uses the custom days text", () => {
      expect(getText(now + hours(24 * 4), { daysText: "dagar" })).toBe("4 dagar");
    });

    it("stops at zero when keepCounting is false", () => {
      expect(getText(now - seconds(3))).toBe("00:00:00");
    });

    it("keeps counting when keepCounting is true", () => {
      expect(getText(now - seconds(3), { keepCounting: true })).toBe("00:00:03");
    });
  });

  describe("getTimerClassState", () => {
    it("marks the timer as finished at zero", () => {
      expect(getTimerClassState(0)).toEqual({ finished: true, passedZero: false });
    });

    it("does not mark finished when keepCounting is enabled", () => {
      expect(getTimerClassState(0, true)).toEqual({ finished: false, passedZero: false });
    });

    it("marks passedZero when counting after zero", () => {
      expect(getTimerClassState(-1, true)).toEqual({ finished: false, passedZero: true });
    });
  });

  describe("fixDate", () => {
    it("returns the original Date instance for Date values", () => {
      const date = new Date(now + seconds(5));

      expect(fixDate(date)).toBe(date);
    });
  });
});
