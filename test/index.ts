import { treetool, WaitAction, StreamControl, Debounce } from "../src";
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

/**************** waitAction 等待执行*/
//1.声明对象
const waitAction: WaitAction = new WaitAction(
  ["ok1", "ok2"],
  //注册一个执行函数
  (params: string) => {
    console.log(params);
  }
);
//在任意时候执行,他将会在第二个ok2被标记完成之后执行
waitAction.action("我终于被执行了呀!!!!!!!");
//有两个异步操作但是我不知道什么时候他们呢谁先执行完,但是异步操作2必须在异步操作1完成之后才可以执行

function asyncFunc() {
  setTimeout(() => {
    //操作2
    waitAction.ready("ok2", () => {
      console.log("操作2执行完毕");
    });
  }, Math.floor(Math.random() * 5000));

  setTimeout(() => {
    //操作1
    waitAction.ready("ok1", () => {
      console.log("操作1执行完毕");
    });
  }, Math.floor(Math.random() * 5000));
}

asyncFunc();

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

function handleInput01(ev: any) {
  //利用闭包声明一个执行函数
  const action = () => {
    console.log("result===>", ev.target.value || "内容为空");
  };
  // 调用 go 扔到 容器中执行
  debouce01.go(action);
}
