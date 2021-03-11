/**
 * 对流控制的类静态类无需实例化,但是同时只能执行一个防抖程序,如果相同时执行多个防抖请使用Debounce类
 */
export class StreamControl {
  static _prevTime;
  static _timeout;
  /**
   * 解决在同一时间内平凡输入执行延迟执行，在延迟时间内会取消上一次的还未执行的程序执行最新的程序，一般用于查询
   * @param action 目标函数
   * @param delay 延迟执行的时间单位毫秒
   */
  static debounce = startAction;
}
/**
 * 防抖类需要实例化
 */
export class Debounce {
  _prevTime;
  _timeout;
  /**
   * 开始执行防抖
   * @param cancelToken 取消执行标志
   * @param action 要呗防抖执行的函数
   * @param _delay 要延迟的时间单位ms默认延迟300ms
   */
  go = startAction;
}
/**
 * 执行防抖
 * @param obj
 * @param action
 * @param delay
 */
function startAction(action, delay = 300) {
  const executeTime = new Date().getTime();
  if (this._prevTime === undefined) {
    this._prevTime = executeTime;
  }
  if (executeTime - this._prevTime > delay) {
    action();
    this._prevTime = undefined;
  } else {
    if (this._timeout) {
      window.clearTimeout(this._timeout);
      this._timeout = null;
    }
    this._timeout = window.setTimeout(() => {
      this._prevTime = undefined;
      action();
    }, delay);
  }
  this._prevTime = executeTime;
}
