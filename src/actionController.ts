import { Callback } from "global-types/common"

export type ActionFunc = Callback<unknown>

export type ActionObject = {
  func?: ActionFunc
  action: ActionFunc
  delay: number
}

export interface ActionControllerParams {
  debounceAction?: ActionFunc
  delay?: number
  debounceDelay?: number
  throttleDelay?: number
  throttleAction?: ActionFunc
}

/**
 * 节流 防抖 对象
 */
export class ActionController {
  constructor(actionParams: ActionControllerParams) {
    const debounceDelay = actionParams.debounceDelay || actionParams.delay || 300
    const throttleDelay = actionParams.throttleDelay || actionParams.delay || 300
    this.debounceObj = {
      action: actionParams.debounceAction,
      delay: debounceDelay,
      func: actionParams.debounceAction && debounce(actionParams.debounceAction, debounceDelay)
    }
    this.throttleObject = {
      action: actionParams.throttleAction,
      delay: throttleDelay,
      func: actionParams.throttleAction && throttle(actionParams.throttleAction, throttleDelay)
    }
  }
  private debounceObj: ActionObject
  private throttleObject: ActionObject

  /**
   * 防抖
   * @param args 参数
   */
  debounce = (...args: unknown[]): void => {
    this.goWhat(args)("debounceObj")
  }

  /**
   * 节流
   * @param args 参数
   */
  throttle = (...args: unknown[]): void => {
    this.goWhat(args)("throttleObject")
  }

  private goWhat = (args: unknown[]) => {
    return (actionName: "debounceObj" | "throttleObject") => {
      this[actionName].func(...args)
    }
  }
}

/**
 * 防抖函数
 * @param fn 要执行的主体函数
 * @param delay 延迟ms为单位
 */
export const debounce = (fn: ActionFunc, delay: number): ActionFunc => {
  let timer: number
  return (...args: unknown[]) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = window.setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 要执行的函数主体
 * @param delay 延迟时间
 */
export const throttle = (fn: ActionFunc, delay: number): ActionFunc => {
  let last = 0
  return (...args: []) => {
    const now = +Date.now()
    if (now > last + delay) {
      fn(...args)
    }
    last = now
  }
}
