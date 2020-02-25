/**
 * 对流控制的类
 */
export default class {
    static _prevTime: number;
    static _timeout: any;
    /**
     * 解决在同一时间内平凡输入执行延迟执行，在延迟时间内会取消上一次的还未执行的程序执行最新的程序，一般用于查询
     * @param actions 目标函数
     * @param delay 延迟执行的时间单位毫秒
     * @param cancelToken 取消钩子
     * @param immediate 是否首次立即执行
     */
    static debounce(actions: Function, delay: number, cancelToken?: boolean, immediate?: boolean): void;
}
