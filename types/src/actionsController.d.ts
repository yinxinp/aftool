import { ActionFunc } from "./actionController";
/**
 * ActionControllers 构造函数中的配置项类型
 */
export declare type ActionsControllerItem = {
    action: ActionFunc;
    delay?: number;
    type?: "debounce" | "throttle";
};
interface IActionControllers {
    [key: string]: ActionFunc;
}
/**
 * 节流函数防抖函数容器
 */
export declare class ActionsController implements IActionControllers {
    /**
     *
     * @param config 防抖节流函数配置
     * @param globalDelay 全局延迟
     */
    constructor(config: {
        [key: string]: ActionsControllerItem | ActionFunc;
    }, globalDelay?: number);
    [key: string]: ActionFunc;
}
export {};
