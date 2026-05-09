import {
  vi,
  describe,
  it,
  expect,
  beforeAll,
  afterAll,
  afterEach,
  h,
  render,
} from "@stencil/vitest";

const realDateNow = Date.now;
const now = Date.now();
const seconds = (s: number) => s * 1000;
const unmounts: Array<() => void> = [];

async function createMatchClock(props: Partial<HTMLHattrickMatchClockElement> = {}) {
  const page = await render<HTMLHattrickMatchClockElement>(
    <hattrick-match-clock></hattrick-match-clock>,
    {
      waitForReady: false,
    },
  );

  unmounts.push(page.unmount);
  await page.setProps({ matchdate: Date.now(), ...props });

  return page;
}

describe("MatchClock unit", () => {
  beforeAll(() => {
    Date.now = vi.fn().mockReturnValue(now);
  });

  afterEach(() => {
    while (unmounts.length > 0) {
      unmounts.pop()?.();
    }
  });

  afterAll(() => {
    Date.now = realDateNow;
  });

  it("should render", async () => {
    let { root: matchclock } = await createMatchClock();

    expect(matchclock).toBeTruthy();
  });

  describe("host", () => {
    it("should have 'match-clock-passed-zero' class when match has started", async () => {
      let { root: matchclock } = await createMatchClock({ matchdate: Date.now() });

      expect(matchclock.classList.contains("match-clock-passed-zero")).toBeTruthy();
    });

    it("should have 'match-clock-passed-zero' class in an upcoming match", async () => {
      let { root: matchclock } = await createMatchClock({ matchdate: Date.now() + seconds(1) });

      expect(matchclock.classList.contains("match-clock-passed-zero")).toBeFalsy();
    });

    it("renders the current match clock text", async () => {
      let { root: matchclock } = await createMatchClock({ matchdate: Date.now() - seconds(11) });

      expect(matchclock.shadowRoot?.querySelector("span")?.textContent).toBe("00:11");
    });
  });
});
