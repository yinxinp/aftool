import { ActionControllers } from "../src"
it("ActionControllers", done => {
  const testFunc = jest.fn()
  const testFunc2 = jest.fn()
  const testThrottleFunc = jest.fn()

  const controller = new ActionControllers({
    testFunc2: {
      action: testFunc2,
      delay: 400
    },
    testThrottleFunc: {
      action: testThrottleFunc,
      type: "throttle"
    },
    testFunc
  })
  controller.testFunc(1223)
  controller.testFunc(1523)
  controller.testFunc(1263)
  controller.testFunc(567)

  controller.testFunc2(1223)
  controller.testFunc2(1523)
  controller.testFunc2(1263)
  controller.testFunc2(567)

  controller.testThrottleFunc(343)
  controller.testThrottleFunc(342)
  controller.testThrottleFunc(3444)
  controller.testThrottleFunc(34555)

  setTimeout(() => {
    const calls = testFunc.mock.calls
    expect(calls.length).toBe(1)
    expect(calls[0][0]).toBe(567)

    const calls2 = testFunc2.mock.calls
    expect(calls2.length).toBe(1)
    expect(calls2[0][0]).toBe(567)

    const calls3 = testThrottleFunc.mock.calls
    expect(calls3.length).toBe(1)
    expect(calls3[0][0]).toBe(343)

    done()
  }, 1000)
})
