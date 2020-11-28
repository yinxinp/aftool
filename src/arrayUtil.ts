import { predicate } from "../types/common";
export class ArrayUtil {
  /**
   * 移除数组中符合条件的元素（不操作原数组）
   * @param array 目标数组
   * @param predicate 寻找目标的函数
   * @returns 被移除过元素的新数组
   */
  static remove<T>(array: T[], predicate: predicate<T>): T[] {
    return array.filter(target => !predicate(target));
  }

  /**
   * 移除第一项符合条件的目标（操作元素组）
   * @param array 目标数组
   * @param predicate 寻找目标的函数
   * @returns 返回被移除过的元素
   */
  static removeFirst<T>(array: T[], predicate: predicate<T>): T | undefined {
    const index = array.findIndex(predicate);
    if (index >= 0) {
      return array.splice(index, 1)[0];
    }
    return undefined;
  }
  /**
   * 移除最后一项符合条件的目标（操作元素组）
   * @param array 目标数组
   * @param predicate 寻找目标的函数
   * @returns 返回被移除过的元素
   */
  static removeLast<T>(array: T[], predicate: predicate<T>): T | undefined {
    for (let i = array.length - 1; i >= 0; i--) {
      const target = array[i];
      if (predicate(target)) {
        array.splice(i, 1);
        return target;
      }
    }
    return undefined;
  }
}
