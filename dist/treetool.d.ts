interface StandardizedType {
    labelProp?: any;
    valueProp?: string;
    keyProp?: string;
    childrenProp?: string;
}
/**
 * 对于树的查询方法
 * @param treeData 源
 * @param conditions 搜索条件
 * @param containChildren 查询结果是否包含子
 */
declare function search(treeData: Array<Object>, conditions: any, containChildren?: Boolean): Array<any>;
/**
 * 返回查询到的第一个匹配的值
 * @param tree 源
 * @param func 过滤函数
 */
declare function find(tree: any[], func: Function): any;
declare const _default: {
    filter: (tree: any[], func: Function, addFunc?: Function | undefined, index?: number | undefined) => any[];
    search: typeof search;
    find: typeof find;
    standardized: (treeNodes: any[], config?: StandardizedType, containMeta?: boolean) => any[];
    toMap: (treeData: any[], foldKey?: string, hasChildren?: boolean | undefined) => Object;
};
export default _default;
