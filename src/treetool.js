import * as utils from "./utils";

/**
 * 树的基本操作
 */

/**
 * 构建统一结构的树结构 [{key,value,label}]
 * @param {Array} treeNodes 树结构
 * @param {String} labelProp 显示名称映射字段名称
 * @param {String} valueProp 值映射的字段名称
 * @param {String|Number} keyProp 对应的key值映射的字段名称
 * @param {String} childrenProp 子映射的字段名称
 * @param {Boolean} containMeta 是否包含元数据 默认false
 */
export const standardized = (
  treeNodes,
  { labelProp, valueProp, keyProp, childrenProp } = {},
  containMeta = false
) => {
  if (!treeNodes) return;
  labelProp = labelProp || "label";
  valueProp = valueProp || "value";
  keyProp = keyProp || "key";
  childrenProp = childrenProp || "children";
  const result = treeNodes.map(node => {
    let children = node[childrenProp];
    if (children) {
      children = standardized(
        children,
        {
          labelProp,
          valueProp,
          keyProp,
          childrenProp
        },
        containMeta
      );
    }
    const splitValue = valueProp.split(".");
    const value = splitValue.reduce((prev, current) => {
      return prev[current];
    }, node);
    const splitLabel = labelProp.split(".");
    const title = splitLabel.reduce((prev, current) => {
      return prev[current];
    }, node);
    const key = node[keyProp];
    let temp = {};
    temp["value"] = value;
    temp["label"] = title;
    temp["key"] = key;
    if (children) {
      temp["children"] = children;
    }
    if (containMeta) {
      temp["meta"] = node;
    }
    return temp;
  });
  return result;
};

/**
 * 展平树成一个数组
 * @param {Array<Object>} treeData 树
 * @param { Boolean } autoKey 自动生成一个以索引为值的key
 * @param { Function } filter 过滤符合条件的树
 * @param { Boolean } autoKey 是否自动加上一个key字段
 */
export const flatTree = (treeData, filter, autoKey) => {
  if (Array.isArray(treeData)) {
    let result = [];
    treeData.forEach(data => {
      const { children, ...other } = data;
      (filter && filter(other) && result.push(other)) ||
        (!filter && result.push(other));
      if (children) {
        result = [...result, ...flatTree(data.children, filter)];
      }
    });
    return (autoKey && addKey(result)) || result;
  }
  // console.error('树形结构有误')
  return [];
};

function addKey(list) {
  return list.map((x, i) => {
    return { ...x, key: i };
  });
}

/**
 * 展平树成一个hashMap的格式
 * @param { Array<Object> } treeData 树
 * @param { String } foldKey 要根据哪个属性展开树 默认是id，注意这个值是唯一的才行
 * @param { Boolean } hasChildren 要不要返回带children的结构
 */
export const toMap = (treeData, foldKey = "id", hasChildren) => {
  if (!treeData) {
    return null;
  }
  let result = {};
  if (Array.isArray(treeData)) {
    result = treeData.reduce((prev, current) => {
      let childResult = {};
      const { children, ...other } = current;
      if (children) {
        childResult = toMap(current.children, foldKey, hasChildren);
      }
      return {
        ...prev,
        [current[foldKey]]: hasChildren ? current : other,
        ...childResult
      };
    }, {});
    return result;
  }
  // console.error('树形结构有误', treeData, foldKey)
  return result;
};
/**
 * 过滤tree的函数
 * @param {Array} list tree
 * @param {Function} func 过滤函数(item,deep) => condition return Boolean
 * @param {Function} addFunc 向每一项中添加新元素 (item,deep) => condition return Boolean
 * @param {index} addFunc 当前树的初始深度 一般不配置
 * @returns {Array} 返回Tree
 */
export const fliter = (list, func, addFunc, index) => {
  let myIndex = index || 0;
  return list.reduce((prev, current) => {
    if (func && !func(current, myIndex)) return prev;
    const additem = (addFunc && addFunc(current, myIndex)) || {};
    if (current.children) {
      let { children: currentChildren, ...currentItem } = current;
      let children = fliter(currentChildren, func, addFunc, myIndex + 1);
      if (children.length !== 0) {
        currentItem = { ...currentItem, children };
      }
      return [...prev, { ...currentItem, ...additem }];
    }
    return [...prev, { ...current, ...additem }];
  }, []);
};

/**
 * 简单的树形过滤器
 * @param { Array<Object> } treeData 树形数据
 * @param {Array<String,Function>} conditions 查询条件 可以传一个过滤函数
 * @param {Bool} containChildren 查询结果是否包含子默认是不包含
 */
export function search(treeData, conditions, containChildren) {
  if (
    !Array.isArray(treeData) ||
    (conditions && !typeof conditions === "object")
  ) {
    console.error("参数不符合！");
    return [];
  }
  if (utils.isAllNullorUndefined(conditions)) {
    return treeData;
  }
  let contitionsKeys = Object.keys(conditions);
  let results = [];
  const normalType = ["boolean", "number"];
  treeData.forEach(x => {
    const { children, ...other } = x;
    const isOk = contitionsKeys.every(contitionsKey => {
      const condition = conditions[contitionsKey];
      if (condition === null || typeof condition === "undefined") {
        //当查询条件为空我们默认查询匹配全部
        return true;
      }
      if (typeof condition === "function") {
        return condition(x[contitionsKey]);
      }
      if (normalType.includes(typeof condition)) {
        return condition === x[contitionsKey];
      }
      if (typeof condition === "string") {
        return new RegExp(condition.trim(), "g").test(x[contitionsKey]);
      }
      throw "查询条件不是支持的类型，支持string,number,boolean,function";
    });
    if (isOk) {
      const currentResult = containChildren ? x : other;
      results.push(currentResult);
    }
    if (children) {
      const tempResult = search(children, conditions);
      results = [...results, ...tempResult];
    }
  });
  return results;
}
/**
 *返回查询到的第一个匹配的值
 * @param {Array} tree 树
 * @param {Function} func 过滤函数
 */
export function find(tree, func) {
  const length = tree.length;
  for (let i = 0; i < length; i++) {
    const currentItem = tree[i];
    if (func(currentItem)) return currentItem;
    const { children } = currentItem;
    if (children) {
      const result = find(children, func);
      if (result) {
        return result;
      }
    }
  }
  return null;
}
