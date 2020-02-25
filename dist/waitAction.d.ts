/**
 * 将多个异步按顺序排成一维并执行目标函数
 */
export declare class WaitAction {
    private wait;
    private okList;
    private valueKey?;
    private myGenerator?;
    private actionFunc?;
    /**
     * 默认构造函数
     * @param waitKeys 等待的标志位
     * @param actionFunc 等待完成之后需要执行的函数
     */
    constructor(waitKeys?: string[], actionFunc?: Function);
    action: (value?: string | undefined) => void;
    ready: (key: string, func?: () => void) => void;
    reset: (waitKeys: string[]) => void;
    /**
     * 设置最后要执行的函数
     */
    setActionFunc: (func: Function) => void;
    destroy: () => void;
    private goNext;
    private generatorFunc;
}
