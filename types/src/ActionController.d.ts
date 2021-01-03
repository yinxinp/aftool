export declare type ActionFunc = (...args: unknown[]) => void;
export declare type ActionObject = {
    func?: ActionFunc;
    action: ActionFunc;
    delay: number;
};
export interface ActionControllerParams {
    debounceAction?: ActionFunc;
    delay?: number;
    debounceDelay?: number;
    throttleDelay?: number;
    throttleAction?: ActionFunc;
}
/**
 * 节流 防抖 对象
 */
export declare class ActionController {
    constructor(actionParams: ActionControllerParams);
    private debounceObj;
    private throttleObject;
    /**
     * 防抖
     * @param args 参数
     */
    debounce(...args: unknown[]): void;
    /**
     * 节流
     * @param args 参数
     */
    throttle(...args: unknown[]): void;
    private goWhat;
}
/**
 * 防抖函数
 * @param fn 要执行的主体函数
 * @param delay 延迟ms为单位
 */
export declare const debounce: (fn: ActionFunc, delay: number) => ActionFunc;
/**
 * 节流函数
 * @param fn 要执行的函数主体
 * @param delay 延迟时间
 */
export declare const throttle: (fn: ActionFunc, delay: number) => ActionFunc;
