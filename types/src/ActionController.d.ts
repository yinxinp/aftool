export declare type ActionObject = {
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
export declare class ActionController {
    constructor(actionParams: ActionControllerParams);
    private debounceObj;
    private throttleObject;
    /**
     * 防抖
     * @param args 参数
     */
    debounce(...args: any[]): void;
    /**
     * 节流
     * @param args 参数
     */
    throttle(...args: any[]): void;
    private goWhat;
}
/**
 * 防抖函数
 * @param fn 要执行的主体函数
 * @param delay 延迟ms为单位
 */
export declare const debounce: (fn: Function, delay: number) => (...args: any[]) => void;
/**
 * 节流函数
 * @param fn 要执行的函数主体
 * @param delay 延迟时间
 */
export declare const throttle: (fn: Function, delay: number) => () => void;
