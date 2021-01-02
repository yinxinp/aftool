export type ActionObject = {
  func?: Function;
  action: Function;
  delay: number;
};

export interface ActionControllerParams {
  debounceAction?: Function;
  delay?: number;
  debounceDelay?: number;
  throttleDelay?: number;
  throttleAction?: Function;
}

/**
 * 节流 防抖 对象
 */
export class ActionController {
  constructor(actionParams: ActionControllerParams) {
    const debounceDelay =
      actionParams.debounceDelay || actionParams.delay || 300;
    const throttleDelay =
      actionParams.throttleDelay || actionParams.delay || 300;
    this.debounceObj = {
      action: actionParams.debounceAction,
      delay: debounceDelay,
      func:
        actionParams.debounceAction &&
        debounce(actionParams.debounceAction, debounceDelay)
    };
    this.throttleObject = {
      action: actionParams.throttleAction,
      delay: throttleDelay,
      func:
        actionParams.throttleAction &&
        throttle(actionParams.throttleAction, throttleDelay)
    };
  }
  private debounceObj: ActionObject;
  private throttleObject: ActionObject;

  /**
   * 防抖
   * @param args 参数
   */
  debounce(...args: any[]) {
    this.goWhat(args)("debounceObj");
  }

  /**
   * 节流
   * @param args 参数
   */
  throttle(...args: any[]) {
    this.goWhat(args)("throttleObject");
  }

  private goWhat(args: any[]) {
    return (actionName: "debounceObj" | "throttleObject") => {
      this[actionName].func(...args);
    };
  }
}

/**
 * 防抖函数
 * @param fn 要执行的主体函数
 * @param delay 延迟ms为单位
 */
export const debounce = (fn: Function, delay: number) => {
  let timer: number;
  return (...args: any[]) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

/**
 * 节流函数
 * @param fn 要执行的函数主体
 * @param delay 延迟时间
 */
export const throttle = (fn: Function, delay: number) => {
  let last = 0;
  return (...args: []) => {
    const now = +Date.now();
    if (now > last + delay) {
      last = now;
      fn(...args);
    }
  };
};
