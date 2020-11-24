/**
 * 对流控制的类静态类无需实例化,但是同时只能执行一个防抖程序,如果相同时执行多个防抖请使用Debounce类
 */
export declare class StreamControl {
    private static _prevTime?;
    private static _timeout?;
    /**
     * 解决在同一时间内平凡输入执行延迟执行，在延迟时间内会取消上一次的还未执行的程序执行最新的程序，一般用于查询
     * @param action 目标函数
     * @param delay 延迟执行的时间单位毫秒
     * @param cancelToken 取消钩子
     */
    static debounce(action: debounceAction, delay?: number, immediate?: boolean, cancelToken?: boolean): void;
}
interface debounceAction {
    (): void;
}
/**
 * 防抖类需要实例化
 */
export declare class Debounce {
    _prevTime?: number;
    _timeout?: number;
    /**
     * 开始执行防抖
     * @param cancelToken 取消执行标志
     * @param immediate 是否立即执行
     * @param action 要呗防抖执行的函数
     * @param _delay 要延迟的时间单位ms默认延迟300ms
     */
    go(action: debounceAction, delay?: number, cancelToken?: boolean): void;
}
export {};
