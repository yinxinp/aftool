/**
 * 对流控制的类静态类无需实例化,但是同时只能执行一个防抖程序,如果相同时执行多个防抖请使用Debounce类
 */
export class StreamControl {
  private static _prevTime?: number;
  private static _timeout?: any;
  /**
   * 解决在同一时间内平凡输入执行延迟执行，在延迟时间内会取消上一次的还未执行的程序执行最新的程序，一般用于查询
   * @param action 目标函数
   * @param delay 延迟执行的时间单位毫秒
   * @param cancelToken 取消钩子
   * @param immediate 是否首次立即执行
   */
  static debounce(
    action: debounceAction,
    delay?: number,
    immediate?: boolean,
    cancelToken?: boolean
  ) {
    startAction(StreamControl, action, delay, cancelToken, immediate);
  }
}

interface debounceAction {
  (): void;
}
/**
 * 防抖类需要实例化
 */
export class Debounce {
  _prevTime?: number;
  _timeout?: number;
  /**
   * 开始执行防抖
   * @param cancelToken 取消执行标志
   * @param immediate 是否立即执行
   * @param action 要呗防抖执行的函数
   * @param _delay 要延迟的时间单位ms默认延迟300ms
   */
  go(
    action: debounceAction,
    delay: number = 300,
    immediate?: boolean,
    cancelToken?: boolean
  ) {
    startAction(this, action, delay, cancelToken, immediate);
  }
}
/**
 * 执行防抖
 * @param obj
 * @param action
 * @param delay
 * @param cancelToken
 * @param immediate
 */
function startAction(
  obj: any,
  action: debounceAction,
  delay: number = 0,
  cancelToken: boolean = false,
  immediate: boolean = false
) {
  if (cancelToken) {
    clearTimeout(obj._timeout);
    obj._timeout = null;
    obj._prevTime = undefined;
    return;
  }
  const executeTime = new Date().getTime();
  if (immediate && !obj._prevTime) {
    action();
    obj._prevTime = executeTime;
    return;
  }
  if (obj._prevTime === undefined) {
    obj._prevTime = executeTime;
  }
  if (executeTime - obj._prevTime > delay) {
    action();
    obj._prevTime = undefined;
  } else {
    if (obj._timeout) {
      window.clearTimeout(obj._timeout);
      obj._timeout = null;
    }
    obj._timeout = window.setTimeout(() => {
      obj._prevTime = undefined;
      action();
    }, delay);
  }
  obj._prevTime = executeTime;
}
