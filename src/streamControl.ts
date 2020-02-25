/**
 * 对流控制的类
 */
export default class {
  static _prevTime?: number;
  static _timeout?: any;
  /**
   * 解决在同一时间内平凡输入执行延迟执行，在延迟时间内会取消上一次的还未执行的程序执行最新的程序，一般用于查询
   * @param actions 目标函数
   * @param delay 延迟执行的时间单位毫秒
   * @param cancelToken 取消钩子
   * @param immediate 是否首次立即执行
   */
  static debounce(
    actions: Function,
    delay: number,
    cancelToken?: boolean,
    immediate?: boolean
  ) {
    if (cancelToken) {
      clearTimeout(this._timeout);
      this._timeout = null;
      this._prevTime = undefined;
      return;
    }
    const executeTime = new Date().getTime();
    if (immediate && !this._prevTime) {
      actions();
      this._prevTime = executeTime;
      return;
    }
    if (this._prevTime===undefined) {
      this._prevTime = executeTime;
    }
    if (executeTime - this._prevTime > delay) {
      actions();
      this._prevTime = undefined;
    } else {
      if (this._timeout) {
        window.clearTimeout(this._timeout);
        this._timeout = null;
      }
      this._timeout = window.setTimeout(() => {
        this._prevTime = undefined;
        actions();
      }, delay);
    }
    this._prevTime = executeTime;
  }
}
