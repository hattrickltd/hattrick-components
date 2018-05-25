import { TestWindow } from '@stencil/core/testing';
// import { render, flush } from '@stencil/core/testing';
import { Timer } from './timer';
import "jest";

// jest.useFakeTimers();

describe('Timer', () => {
  it('should build', () => {
    expect(new Timer()).toBeTruthy();
  });

  // describe('rendering', () => {
  //   let element;

  //   beforeEach(async () => {
  //     element = await render({
  //       components: [Timer],
  //       html: '<ht-timer></ht-timer>'
  //     });
  //     // element = await render();
  //   });

  //   it('fake', async () => {
  //     element.deadline = Date.now();
  //     await flush(element);
  //     console.log(element.textContent);
  //     expect(element.textContent).toBe("00:00:00");
  //   });
  // });

  describe('rendering', () => {
    let window: TestWindow;
    let element;

    let spyOnUpdateTime;

    beforeEach(async () => {
      spyOnUpdateTime = jest.spyOn(Timer.prototype, "updateTime");

      window = new TestWindow();
      element = await window.load({
        components: [Timer],
        html: '<ht-timer></ht-timer>'
      });
    });

    // it('should show 00:00:00 when deadline is now', async () => {
    //   element.deadline = Date.now();
    //   await window.flush();
    //   expect(element.textContent).toBe("00:00:00");
    // });

    // it('should show 00:00:11 when deadline is in 11 seconds', async () => {
    //   element.deadline = Date.now() + 11000 + 500;
    //   await window.flush();
    //   expect(element.textContent).toBe("00:00:11");
    // });

    // it('should show 00:01:01 when deadline is in 61 seconds', async () => {
    //   element.deadline = Date.now() + 61 * 1000 + 500;
    //   await window.flush();
    //   expect(element.textContent).toBe("00:01:01");
    // });

    // it('should show 01:01:01 when deadline is 1 hour and 61 seconds', async () => {
    //   element.deadline = Date.now() + 3661 * 1000 + 500;
    //   await window.flush();
    //   expect(element.textContent).toBe("01:01:01");
    // });

    // it('should show 24:00:00 when deadline is in 1 day', async () => {
    //   element.deadline = Date.now() + 1000 * 60 * 60 * 24 + 500;
    //   await window.flush();
    //   expect(element.textContent).toBe("24:00:00");
    // });

    // it('should show "4 days" when deadline is in 4 day', async () => {
    //   element.deadline = Date.now() + 1000 * 60 * 60 * 24 * 4 + 500; // plus 500 since we're time sensitive
    //   await window.flush();
    //   expect(element.textContent).toBe("4 days");
    // });

    // it('should show "4 dagar" when deadline is in 4 day and `daysText` is set to "days"', async () => {
    //   element.deadline = Date.now() + 1000 * 60 * 60 * 24 * 4 + 500; // plus 500 since we're time sensitive
    //   element.daysText = "dagar";
    //   await window.flush();
    //   expect(element.textContent).toBe("4 dagar");
    // });

    // it('should tick after one second', async () => {
    //   element.deadline = Date.now() + 1000 + 500;
    //   await window.flush();
    //   expect(element.textContent).toBe("00:00:01");

    //   jest.advanceTimersByTime(1001);

    //   await window.flush();
    //   expect(element.textContent).toBe("00:00:00");
    // });

    it('should keep counting when property is set', async () => {
      // console.log(element.updateTime);
      // setTimeout(() => console.log(element, element.updateTime));
      // let spyOnUpdateTime = jest.spyOn(Timer.prototype, "updateTime");

      expect(spyOnUpdateTime).toHaveBeenCalledTimes(1);

      element.deadline = Date.now() + 500;
      element.keepCounting = true;

      expect(spyOnUpdateTime).toHaveBeenCalledTimes(2);
      
      await window.flush();
      // expect(element.textContent).toBe("00:00:00");
      
      jest.advanceTimersByTime(1500);
      // jest.runOnlyPendingTimers();

      await window.flush();
      expect(spyOnUpdateTime).toHaveBeenCalledTimes(3);
      
      expect(element.textContent).toBe("00:00:01");
    });
  });
});
