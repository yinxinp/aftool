import * as utils from "./utils";
/**
 * 树的基本操作
 */

/**
 * 构建统一结构的树结构 [{key,value,label}]
 * @param treeNodes 树结构
 * @param labelProp 显示名称映射字段名称
 * @param valueProp 值映射的字段名称
 * @param keyProp 对应的key值映射的字段名称
 * @param childrenProp 子映射的字段名称
 * @param containMeta 是否包含元数据 默认false
 */
const standardized = (treeNodes, config = {}, containMeta = false) => {
  let {
    labelProp = "label",
    valueProp = "value",
    keyProp = "key",
    childrenProp = "children",
  } = config;
  const result = treeNodes.map((node) => {
    let children = node[childrenProp];
    if (children) {
      children = standardized(
        children,
        {
          labelProp,
          valueProp,
          keyProp,
          childrenProp,
        },
        containMeta
      );
    }
    const splitValue = valueProp.split(".");
    const value = splitValue.reduce((prev, current) => {
      return prev[current];
    }, node);
    let title;
    if (typeof labelProp === "function") {
      title = labelProp(node);
    } else {
      const splitLabel = labelProp.split(".");
      title = splitLabel.reduce((prev, current) => {
        return prev[current];
      }, node);
    }
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
 * @param treeData 树
 * @param autoKey 自动生成一个以索引为值的key
 * @param filter 过滤符合条件的树
 * @param autoKey 是否自动加上一个key字段
 */
const flatTree = (treeData, filter, autoKey) => {
  if (Array.isArray(treeData)) {
    let result = [];
    treeData.forEach((data) => {
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
 * @param treeData 树
 * @param foldKey 要根据哪个属性展开树 默认是id，注意这个值是唯一的才行
 * @param containChild 要不要返回带children的结构
 */
const toMap = (treeData, foldKey = "id", containChild = false) => {
  let result = {};
  if (Array.isArray(treeData)) {
    result = treeData.reduce((prev, current) => {
      let childResult = {};
      const { children, ...other } = current;
      if (children) {
        childResult = toMap(current.children, foldKey, containChild);
      }
      return {
        ...prev,
        [current[foldKey]]: containChild ? current : other,
        ...childResult,
      };
    }, {});
    return result;
  }
  // console.error('树形结构有误', treeData, foldKey)
  return result;
};
/**
 * 过滤tree的函数
 * @param list tree
 * @param  func 过滤函数(item,deep) => condition return Boolean
 * @param  addFunc 向每一项中添加新元素 (item,deep) => condition return Boolean
 * @param  addFunc 当前树的初始深度 一般不配置
 */
const filter = (tree, func, addFunc, index) => {
  let myIndex = index || 0;
  return tree.reduce((prev, current) => {
    if (func && !func(current, myIndex)) return prev;
    const additem = (addFunc && addFunc(current, myIndex)) || {};
    if (current.children) {
      let { children: currentChildren, ...currentItem } = current;
      let children = filter(currentChildren, func, addFunc, myIndex + 1);
      if (children.length !== 0) {
        currentItem = { ...currentItem, children };
      }
      return [...prev, { ...currentItem, ...additem }];
    }
    return [...prev, { ...current, ...additem }];
  }, []);
};

/**
 * 对于树的查询方法
 * @param treeData 源
 * @param conditions 搜索条件
 * @param containChildren 查询结果是否包含子
 */
function search(treeData, conditions, containChildren) {
  if (utils.isAllNullorUndefined(conditions)) {
    return treeData;
  }
  let contitionsKeys = Object.keys(conditions);
  let results = [];
  const normalType = ["boolean", "number"];
  treeData.forEach((x) => {
    const { children, ...other } = x;
    const isOk = contitionsKeys.every((contitionsKey) => {
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
 * 返回查询到的第一个匹配的值
 * @param tree 源
 * @param func 过滤函数
 */
function find(tree, func) {
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

export default {
  filter,
  search,
  find,
  standardized,
  toMap,
};
