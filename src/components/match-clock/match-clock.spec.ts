// import { TestWindow } from "@stencil/core/testing";
// // import { render, flush } from '@stencil/core/testing';
// import { MatchClock } from "./match-clock";
// import "jest";

// // jest.useFakeMatchClocks();

// describe("MatchClock", () => {
//   it("should build", () => {
//     expect(new MatchClock()).toBeTruthy();
//   });

//   describe("rendering", () => {
//     let window: TestWindow;
//     let element;

//     // let spyOnUpdateTime: jest.SpyInstance<() => void>; // doens't reset as intended in afterEach()
//     // let clock: typeof jest;

//     beforeEach(async () => {
//       // clock = jest.useFakeMatchClocks();
//       // spyOnUpdateTime = jest.spyOn(MatchClock.prototype, "updateTime");

//       window = new TestWindow();
//       element = await window.load({
//         components: [MatchClock],
//         html: "<hattrick-match-clock></hattrick-match-clock>"
//       });
//     });

//     // afterEach(() => {
//     //   spyOnUpdateTime.mockRestore();
//     // });

//     it("should show 00:00:00 when deadline is now", async () => {
//       element.deadline = Date.now();

//       await window.flush();

//       expect(element.textContent).toBe("00:00:00");
//     });

//     it("should show 00:00:11 when deadline is in 11 seconds", async () => {
//       element.deadline = Date.now() + 11000 + 500;

//       await window.flush();

//       expect(element.textContent).toBe("00:00:11");
//     });

//     it("should show 00:01:01 when deadline is in 61 seconds", async () => {
//       element.deadline = Date.now() + 61 * 1000 + 500;

//       await window.flush();

//       expect(element.textContent).toBe("00:01:01");
//     });

//     it("should show 01:01:01 when deadline is 1 hour and 61 seconds", async () => {
//       element.deadline = Date.now() + 3661 * 1000 + 500;

//       await window.flush();

//       expect(element.textContent).toBe("01:01:01");
//     });

//     it("should show 24:00:00 when deadline is in 1 day", async () => {
//       element.deadline = Date.now() + 1000 * 60 * 60 * 24 + 500;
//       await window.flush();
//       expect(element.textContent).toBe("24:00:00");
//     });

//     it("should show '4 days' when deadline is in 4 day", async () => {
//       element.deadline = Date.now() + 1000 * 60 * 60 * 24 * 4 + 500; // plus 500 since we're time sensitive

//       await window.flush();

//       expect(element.textContent).toBe("4 days");
//     });

//     it("should show '4 dagar' when deadline is in 4 day and `daysText` is set to 'days'", async () => {
//       element.deadline = Date.now() + 1000 * 60 * 60 * 24 * 4 + 500; // plus 500 since we're time sensitive
//       element.daysText = "dagar";

//       await window.flush();

//       expect(element.textContent).toBe("4 dagar");
//     });

//     it("should stop at zero if keepCounting is not set", async () => {
//       element.deadline = Date.now() - 3000;

//       await window.flush();

//       expect(element.textContent).toBe("00:00:00");
//     });

//     it("should keep counting when property is set", async () => {
//       element.deadline = Date.now() - 3000;
//       element.keepCounting = true;

//       await window.flush();

//       expect(element.textContent).toBe("00:00:03");
//     });

//     it("should get have finished class when reaching zero", async() => {
//       element.deadline = Date.now();

//       await window.flush();

//       expect(element.classList.contains("hattrick-MatchClock-finished")).toBeTruthy();
//     });

//     it("should not have finished class when reaching zero if we'll keep counting", async() => {
//       element.deadline = Date.now();
//       element.keepCounting = true;

//       await window.flush();

//       expect(element.classList.contains("hattrick-MatchClock-finished")).toBeFalsy();
//     });

//     it("should not have finished class when reaching zero if we'll keep counting", async() => {
//       element.deadline = Date.now() - 1000;
//       element.keepCounting = true;

//       await window.flush();

//       expect(element.classList.contains("hattrick-MatchClock-passed-zero")).toBeTruthy();
//     });

//     it("should tick after one second", async (done) => {
//       element.deadline = Date.now() + 1000 + 500;

//       await window.flush();

//       expect(element.textContent).toBe("00:00:01");

//       setTimeout(async () => {
//         await window.flush();

//         expect(element.textContent).toBe("00:00:00");
//         expect(element.classList.contains("hattrick-MatchClock-finished")).toBeTruthy();

//         done();
//       }, 1000);
//       // clock.advanceMatchClocksByTime(1000);
//       // clock.runAllMatchClocks();
//       // clock.runOnlyPendingMatchClocks();

//     });

//     describe("non-numeric deadlines", () => {
//       it("allows date deadlines", async () => {
//         element.deadline = new Date(Date.now() + 61 * 1000 + 500);

//         await window.flush();

//         expect(element.textContent).toBe("00:01:01");
//       });

//       it("allows string numbers", async () => {
//         element.deadline = (Date.now() + 61 * 1000 + 500).toString();

//         await window.flush();

//         expect(element.textContent).toBe("00:01:01");
//       });

//       it("allows string Date deadlines", async () => {
//         element.deadline = new Date((Date.now() + 61 * 1000 + 500)).toISOString();

//         await window.flush();

//         expect(element.textContent).toBe("00:01:01");
//       });
//     });

//   });
// });
