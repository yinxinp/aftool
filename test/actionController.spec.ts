import { ActionController } from "../src";
it("ActionController", done => {
  const testFunc = jest.fn();
  const testThrottleFunc = jest.fn();

  const testFunc2 = jest.fn();
  const testThrottleFunc2 = jest.fn();
  const controller = new ActionController({
    debounceAction: testFunc,
    throttleAction: testThrottleFunc
  });
  const controller2 = new ActionController({
    debounceAction: testFunc2,
    throttleAction: testThrottleFunc2
  });
  controller.debounce();
  controller.debounce(34);
  controller.debounce();
  controller.debounce(333);

  controller.throttle(34);
  controller.throttle(22);
  controller.throttle(12);
  controller.throttle(55);

  controller2.debounce(2);
  controller2.debounce(3);
  controller2.debounce(4);
  controller2.debounce(5);

  controller2.throttle(6);
  controller2.throttle(3);
  controller2.throttle(125);
  controller2.throttle(63);

  setTimeout(() => {
    const calls = testFunc.mock.calls;
    expect(calls.length).toBe(1);
    expect(calls[0][0]).toBe(333);

    const throttleCalls = testThrottleFunc.mock.calls;
    expect(throttleCalls.length).toBe(1);
    expect(throttleCalls[0][0]).toBe(34);

    const calls2 = testFunc2.mock.calls;
    expect(calls2.length).toBe(1);
    expect(calls2[0][0]).toBe(5);

    const throttleCalls2 = testThrottleFunc2.mock.calls;
    expect(throttleCalls2.length).toBe(1);
    expect(throttleCalls2[0][0]).toBe(6);
    done();
  }, 1000);
});
