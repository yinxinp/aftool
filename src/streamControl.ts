/**
 * 对流控制的类
 */
export class StreamControl {
  private static _prevTime?: number;
  private static _timeout?: any;
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
      clearTimeout(StreamControl._timeout);
      StreamControl._timeout = null;
      StreamControl._prevTime = undefined;
      return;
    }
    const executeTime = new Date().getTime();
    if (immediate && !StreamControl._prevTime) {
      actions();
      StreamControl._prevTime = executeTime;
      return;
    }
    if (StreamControl._prevTime === undefined) {
      StreamControl._prevTime = executeTime;
    }
    if (executeTime - StreamControl._prevTime > delay) {
      actions();
      StreamControl._prevTime = undefined;
    } else {
      if (StreamControl._timeout) {
        window.clearTimeout(StreamControl._timeout);
        StreamControl._timeout = null;
      }
      StreamControl._timeout = window.setTimeout(() => {
        StreamControl._prevTime = undefined;
        actions();
      }, delay);
    }
    StreamControl._prevTime = executeTime;
  }
}
