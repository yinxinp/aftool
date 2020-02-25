import { treetool } from "../src";
import { generatorTree } from "./data";
/**
 * 以下测试数据
 */
const treeData01 = generatorTree(20, 5);
console.log("treeData01", treeData01);

const find = treetool.find(treeData01, (item: any) => item.random === 23);
console.log("find", find);

const fliter = treetool.fliter(
  treeData01,
  (item: any, deep: number) => item.random >= deep + 10
);
console.log("fliter", fliter);

const toMap = treetool.toMap(treeData01, "test02");
console.log("toMap", toMap);

const search = treetool.search(treeData01, { random: 25 }, true);
console.log("search", search);

const standardized = treetool.standardized(treeData01, {
  labelProp: "test02",
  valueProp: "random",
  keyProp: "test04"
});
console.log("standardized", standardized);
