import { debounce, throttle, ActionFunc } from "./actionController"

/**
 * ActionControllers 构造函数中的配置项类型
 */
export type ActionControllersItem = {
  action: ActionFunc
  delay?: number
  type?: "debounce" | "throttle"
}

interface IActionControllers {
  [key: string]: ActionFunc
}
/**
 * 节流函数防抖函数容器
 */
export class ActionControllers implements IActionControllers {
  /**
   *
   * @param config 防抖节流函数配置
   * @param globalDelay 全局延迟
   */
  constructor(config: { [key: string]: ActionControllersItem | ActionFunc }, globalDelay = 300) {
    Object.entries(config).forEach(([key, value]) => {
      if (typeof value === "function") {
        this[key] = debounce(value, globalDelay)
        return
      }
      const currentDelay = value.delay ?? globalDelay
      if (value.type === "throttle") {
        this[key] = throttle(value.action, currentDelay)
      } else {
        this[key] = debounce(value.action, currentDelay)
      }
    })
  }
  [key: string]: ActionFunc
}
