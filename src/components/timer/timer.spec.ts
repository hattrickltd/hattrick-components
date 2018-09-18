import "jest";
import { Timer } from "./timer";

const realDateNow = Date.now;
const now = Date.now();

const hours = (h) => h * 1000 * 60 * 60;
const minutes = (m) => m * 1000 * 60;
const seconds = (s) => s * 1000;

function setDeadline(t: Timer, deadline?: number | Date | string) {
  if (deadline) t.deadline = deadline;

  (t as any).deadlineUpdated();
  (t as any).updateTime();
}

describe("Timer unit", () => {
  let timer: Timer;

  beforeEach(() => {
    timer = new Timer();
  });

  beforeAll(() => {
    Date.now = jest.fn().mockReturnValue(now);
  });
  afterAll(() => {
    Date.now = realDateNow;
  });

  it("should build", () => {
    expect(timer).toBeTruthy();
  });

  describe("seconds", () => {
    it("should be 0 when deadline is now", () => {
      setDeadline(timer, Date.now());

      expect((timer as any).seconds).toBe(0);
    });

    it("should be less than 0 when deadline is in the past", () => {
      setDeadline(timer, Date.now() - seconds(10));

      expect((timer as any).seconds).toBeLessThan(0);
    });

    it("should be bigger than 0 when deadline is in the future", () => {
      setDeadline(timer, Date.now() + seconds(10));

      expect((timer as any).seconds).toBeGreaterThan(0);
    });
  });

  describe("getTime", () => {
    it("should be 00:00:00 when deadline is now", () => {
      setDeadline(timer, Date.now());

      expect((timer as any).getTime()).toBe("00:00:00");
    });

    it("should show 00:00:11 when deadline is in 11 seconds", () => {
      setDeadline(timer, Date.now() + seconds(11));

      expect((timer as any).getTime()).toBe("00:00:11");
    });

    it("should show 00:01:01 when deadline is in 61 seconds", () => {
      setDeadline(timer, Date.now() + seconds(61));

      expect((timer as any).getTime()).toBe("00:01:01");
    });

    it("should show 01:01:01 when deadline is 1 hour and 61 seconds", () => {
      setDeadline(timer, Date.now() + hours(1) + minutes(1) + seconds(1));

      expect((timer as any).getTime()).toBe("01:01:01");
    });

    it("should show 24:00:00 when deadline is in 1 day", () => {
      setDeadline(timer, Date.now() + hours(24));

      expect((timer as any).getTime()).toBe("24:00:00");
    });
  });

  describe("daysText", () => {

    it("should show '4 days' when deadline is in 4 day", () => {
      setDeadline(timer, Date.now() + hours(24 * 4));

      expect((timer as any).getTime()).toBe("4 days");
    });

    it("should show '4 dagar' when deadline is in 4 day", () => {
      setDeadline(timer, Date.now() + hours(24 * 4));
      timer.daysText = "dagar";

      expect((timer as any).getTime()).toBe("4 dagar");
    });
  });

  describe("keepCounting", () => {

    it("should stop at zero if keepCounting is not set", () => {
      setDeadline(timer, Date.now() + seconds(-3));

      expect((timer as any).getTime()).toBe("00:00:00");
    });

    it("should keep counting when keepCounting is set", () => {
      setDeadline(timer, Date.now() + seconds(-3));
      timer.keepCounting = true;

      expect((timer as any).getTime()).toBe("00:00:03");
    });
  });

  describe("hostData", () => {
    it("has 'timer' role", () => {
      expect(timer.hostData().role).toBe("timer");
    });

    it("should get have finished class when reaching zero", () => {
      setDeadline(timer, Date.now());

      expect(timer.hostData().class["timer-finished"]).toBeTruthy();
    });

    it("should not have finished class when reaching zero if we'll keep counting", () => {
      setDeadline(timer, Date.now());
      timer.keepCounting = true;

      expect(timer.hostData().class["timer-finished"]).toBeFalsy();
    });

    it("should have passed zero class after passing zero if we'll keep counting", () => {
      setDeadline(timer, Date.now() - seconds(1));
      timer.keepCounting = true;

      expect(timer.hostData().class["timer-passed-zero"]).toBeTruthy();
    });
  });

  describe("non-numeric deadlines", () => {
    it("allows date deadlines", () => {
      setDeadline(timer, new Date(Date.now() + seconds(61)));

      expect((timer as any).getTime()).toBe("00:01:01");
    });

    it("allows string numbers", () => {
      setDeadline(timer, (Date.now() + seconds(61)).toString());

      expect((timer as any).getTime()).toBe("00:01:01");
    });

    it("allows string Date deadlines", () => {
      setDeadline(timer, new Date((Date.now() + seconds(61))).toISOString());

      expect((timer as any).getTime()).toBe("00:01:01");
    });
  });

  describe("ticks", () => {

    it("from 1 to 0 after a second", () => {
      setDeadline(timer, Date.now() + seconds(1));

      Date.now = jest.fn(() => now + 1);
      setDeadline(timer);

      expect((timer as any).getTime()).toBe("00:00:00");

      Date.now = jest.fn(() => now + 1000);
      setDeadline(timer);

      expect((timer as any).getTime()).toBe("00:00:00");
    });
  });
});
