/**
 * 将多个异步按顺序排成一维并执行目标函数
 */
export declare class Waiter {
    private wait;
    private okList;
    private myGenerator?;
    /**
     * 默认构造函数
     * @param waitKeys 等待的标志位
     * @param actionFunc 等待完成之后需要执行的函数
     */
    constructor(waitKeys?: string[]);
    ready: (key: string, func?: () => void) => void;
    reset: (waitKeys: string[]) => void;
    destroy: () => void;
    private goNext;
    private generatorFunc;
}
