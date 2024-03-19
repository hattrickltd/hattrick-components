import "jest";
import { h } from "@stencil/core";
import { SpecPage, newSpecPage } from "@stencil/core/testing";
import { MatchClock } from "./match-clock";

const realDateNow = Date.now;
const now = Date.now();

const hours = (h) => h * 1000 * 60 * 60;
const minutes = (m) => m * 1000 * 60;
const seconds = (s) => s * 1000;

const texts = {
  days: "d",
  hours: "h",
  minutes: "m",
  seconds: "s",
  overtime: "Overtime",
  overtimeBreak: "Overtime break",
  halftime: "Half time",
};

function setMatchtimer(t: MatchClock, matchdate?: number | Date | string) {
  if (matchdate) t.matchdate = matchdate;

  (t as any).matchdateUpdated();
  (t as any).updateTime();
}

async function createMatchClock(): Promise<
  [SpecPage, HTMLHattrickMatchClockElement]
> {
  let page = await newSpecPage({
    components: [MatchClock],
    template: () => <hattrick-match-clock></hattrick-match-clock>,
  });

  return [page, page.root as HTMLHattrickMatchClockElement];
}

describe("MatchClock unit", () => {
  let matchclock: MatchClock;

  beforeEach(() => {
    matchclock = new MatchClock();
  });

  beforeAll(() => {
    Date.now = jest.fn().mockReturnValue(now);
  });
  afterAll(() => {
    Date.now = realDateNow;
  });

  it("should build", () => {
    expect(matchclock).toBeTruthy();
  });

  describe("seconds", () => {
    it("should be 0 when matchtime is now", () => {
      setMatchtimer(matchclock, Date.now());

      expect((matchclock as any).seconds).toBe(0);
    });

    it("should be less than 0 when matchtime is in the past", () => {
      setMatchtimer(matchclock, Date.now() - seconds(10));

      expect((matchclock as any).seconds).toBeLessThan(0);
    });

    it("should be bigger than 0 when matchtime is in the future", () => {
      setMatchtimer(matchclock, Date.now() + seconds(10));

      expect((matchclock as any).seconds).toBeGreaterThan(0);
    });
  });

  describe("during match", () => {
    describe("getTime", () => {
      it("should be 00:00 when matchtime is now", () => {
        setMatchtimer(matchclock, Date.now());

        expect((matchclock as any).getTime()).toBe("00:00");
      });

      it("should show '00:11' when matchtime was 11 seconds ago", () => {
        setMatchtimer(matchclock, Date.now() - seconds(11));

        expect((matchclock as any).getTime()).toBe("00:11");
      });

      it("should show '01:01' when matchtime was 61 seconds ago", () => {
        setMatchtimer(matchclock, Date.now() - seconds(61));

        expect((matchclock as any).getTime()).toBe("01:01");
      });

      it("should show countdown during halftime", () => {
        setMatchtimer(matchclock, Date.now() - minutes(45));

        expect((matchclock as any).getTime()).toBe("15:00");
      });

      it("should show '45:00' when second half starts", () => {
        setMatchtimer(matchclock, Date.now() - minutes(60));

        expect((matchclock as any).getTime()).toBe("45:00");
      });

      it("should show countdown during overtime break", () => {
        setMatchtimer(matchclock, Date.now() - minutes(105));

        expect((matchclock as any).getTime()).toBe("05:00");
      });

      it("should show '90:00' when overtime starts", () => {
        setMatchtimer(matchclock, Date.now() - minutes(110));

        expect((matchclock as any).getTime()).toBe("90:00");
      });
    });

    describe("with 3 added minutes", () => {
      beforeEach(() => {
        matchclock.addedMinutes = 3;
      });

      it("should show '90:00' instead of countdown for overtime break", () => {
        setMatchtimer(matchclock, Date.now() - minutes(105));

        expect((matchclock as any).getTime()).toBe("90:00");
      });

      it("should show countdown after 93 minutes of match time", () => {
        setMatchtimer(matchclock, Date.now() - minutes(105) - minutes(3));

        expect((matchclock as any).getTime()).toBe("05:00");
      });

      it("should show '90:00' again when overtime starts", () => {
        setMatchtimer(matchclock, Date.now() - minutes(110) - minutes(3));

        expect((matchclock as any).getTime()).toBe("90:00");
      });
    });

    describe("with texts", () => {
      beforeEach(() => {
        matchclock.texts = texts;
      });

      it("should show '(Half time)' after match clock", () => {
        setMatchtimer(matchclock, Date.now() - minutes(45));

        expect((matchclock as any).getTime()).toBe("15:00 (Half time)");
      });

      it("should show '(Overtime break)' after match clock", () => {
        setMatchtimer(matchclock, Date.now() - minutes(105));

        expect((matchclock as any).getTime()).toBe("05:00 (Overtime break)");
      });

      it("should show '(Overtime)' after match clock", () => {
        setMatchtimer(matchclock, Date.now() - minutes(110));

        expect((matchclock as any).getTime()).toBe("90:00 (Overtime)");
      });
    });
  });

  describe("before match", () => {
    beforeEach(() => {
      matchclock.texts = texts;
    });

    it("shows days, hours, minutes and seconds", () => {
      setMatchtimer(matchclock, Date.now() + hours(24 + 1));

      expect((matchclock as any).getTime()).toBe("1d 1h 00m 00s");
    });

    it("shows hours, minutes and seconds", () => {
      setMatchtimer(matchclock, Date.now() + hours(1));

      expect((matchclock as any).getTime()).toBe("1h 00m 00s");
    });

    it("shows minutes and seconds", () => {
      setMatchtimer(matchclock, Date.now() + minutes(1));

      expect((matchclock as any).getTime()).toBe("01m 00s");
    });

    it("shows seconds", () => {
      setMatchtimer(matchclock, Date.now() + seconds(1));

      expect((matchclock as any).getTime()).toBe("00m 01s");
    });
  });

  describe("hostData", () => {
    // it("has 'timer' role", async () => {
    //   let page = await newSpecPage({
    //     components: [MatchClock],
    //     template: () => <hattrick-match-clock></hattrick-match-clock>,
    //   });

    //   expect(page.root.role).toBe("timer");
    // });

    it("should have 'match-clock-passed-zero' class when match has started", async () => {
      let [page, matchclock] = await createMatchClock();

      matchclock.matchdate = Date.now();
      await page.waitForChanges();

      expect(
        page.root.classList.contains("match-clock-passed-zero"),
      ).toBeTruthy();
    });

    it("should have 'match-clock-passed-zero' class in an upcoming match", async () => {
      let [page, matchclock] = await createMatchClock();

      matchclock.matchdate = Date.now() + seconds(1);
      await page.waitForChanges();

      expect(
        page.root.classList.contains("match-clock-passed-zero"),
      ).toBeFalsy();
    });
  });

  // describe("pause/resume", () => {
  //   it("should not move while paused", () => {
  //     setMatchtimer(matchclock, Date.now());
  //     matchclock.pause();

  //     Date.now = jest.fn().mockReturnValue(now + 1000);
  //     setMatchtimer(matchclock);

  //     expect((matchclock as any).getTime()).toBe("00:00");
  //   });

  //   it("should move the time back after resume", () => {
  //     setMatchtimer(matchclock, Date.now());
  //     matchclock.pause();

  //     expect((matchclock as any).getTime()).toBe("00:00");

  //     Date.now = jest.fn().mockReturnValue(now + 1000);
  //     setMatchtimer(matchclock);

  //     matchclock.resume();
  //     expect((matchclock as any).getTime()).toBe("00:00");
  //   });
  // });
});
