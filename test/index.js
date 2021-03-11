import { treetool, StreamControl, Debounce } from "../src";
import { generatorTree } from "./data";
/**
 * 以下测试数据
 */
const treeData01 = generatorTree(20, 5);
console.log("treeData01", treeData01);

const find = treetool.find(treeData01, (item) => item.random === 23);
console.log("find", find);

const filter = treetool.filter(
  treeData01,
  (item, deep) => item.random >= deep + 10
);
console.log("filter", filter);

const toMap = treetool.toMap(treeData01, "test02");
console.log("toMap", toMap);

const search = treetool.search(treeData01, { random: 25 }, true);
console.log("search", search);

const standardized = treetool.standardized(treeData01, {
  labelProp: "test02",
  valueProp: "random",
  keyProp: "test04",
});
console.log("standardized", standardized);

/****************测试streamControl*/
const btn01 = document.querySelector("#btn01");
if (btn01) {
  btn01.addEventListener("click", () => {
    StreamControl.debounce(() => {
      alert("我被执行了");
    }, 1000);
  });
}
// 实例化防抖测试
const input01 = document.querySelector("#input01");
if (input01) {
  input01.addEventListener("input", handleInput01);
}

const debouce01 = new Debounce(); //新建防抖器

function handleInput01(ev) {
  //利用闭包声明一个执行函数
  const action = () => {
    console.log("result===>", ev.target.value || "内容为空");
  };
  // 调用 go 扔到 容器中执行 第三个参数为true第一次输入会立即执行 后面防抖
  debouce01.go(action, 1000, true);
}
