import { predicate } from "../global_types/common";
export declare class ArrayUtil {
    /**
     * 移除数组中符合条件的元素（操作原数组）
     * @param array 目标数组
     * @param predicate 寻找目标的函数
     * @returns 被移除的元素的数组
     */
    static remove<T>(array: T[], predicate: predicate<T>): T[];
    /**
     * 移除第一项符合条件的目标（操作元素组）
     * @param array 目标数组
     * @param predicate 寻找目标的函数
     * @returns 返回被移除过的元素
     */
    static removeFirst<T>(array: T[], predicate: predicate<T>): T | undefined;
    /**
     * 移除最后一项符合条件的目标（操作元素组）
     * @param array 目标数组
     * @param predicate 寻找目标的函数
     * @returns 返回被移除过的元素
     */
    static removeLast<T>(array: T[], predicate: predicate<T>): T | undefined;
    /**
     * 递归将树展平为hashmap
     * @param tree
     * @param config 展平操作的配置 keyProp:string = "id" childProp:string="children"
     * @returns {[string]:any}
     */
    static flatToMap<T extends {
        [key: string]: any;
    }>(tree?: T[], config?: {
        keyProp: string;
        childProp: string;
    }): {
        [key: string]: T;
    };
}
