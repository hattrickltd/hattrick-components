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
const unmounts: Array<() => void> = [];

const seconds = (n: number) => n * 1000;

async function createTimer(props: Partial<HTMLHattrickTimerElement> = {}) {
  const page = await render<HTMLHattrickTimerElement>(<hattrick-timer></hattrick-timer>, {
    waitForReady: false,
  });

  unmounts.push(page.unmount);

  await page.setProps({ deadline: Date.now(), ...props });

  return page;
}

describe("Timer unit", () => {
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
    let { root: timer } = await createTimer();

    expect(timer).toBeTruthy();
  });

  describe("host", () => {
    it("has 'timer' role", async () => {
      let { root: timer } = await createTimer();

      expect(timer.getAttribute("role")).toBe("timer");
    });

    it("applies the finished class when the timer reaches zero", async () => {
      let { root: timer } = await createTimer({ deadline: Date.now() });

      expect(timer.classList.contains("timer-finished")).toBeTruthy();
      expect(timer.classList.contains("timer-passed-zero")).toBeFalsy();
    });

    it("applies the passed-zero class when keepCounting is enabled", async () => {
      let { root: timer } = await createTimer({
        deadline: Date.now() - seconds(1),
        keepCounting: true,
      });

      expect(timer.classList.contains("timer-finished")).toBeFalsy();
      expect(timer.classList.contains("timer-passed-zero")).toBeTruthy();
    });
  });
});
