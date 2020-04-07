# aftool
`ver 1.2.9` 添加fileTool 包含saveJson的方法用于保存json文件
`ver 1.2.8` 添加domTool用于创建dom 的一些工具类


- `example`
  
  > data.js

```javascript
export function generatorTree(num = 0, deep = 0, currentIndex = 0) {
  let container = [];
  if (num) {
    for (let i = 0; i < num; i++) {
      let children = {};
      if (currentIndex < deep) {
        currentIndex++;
        children.children = generatorTree(num, deep, currentIndex);
      }
      container.push({
        test01: `test01-${i}-${currentIndex}`,
        test02: `test02-${i}-${currentIndex}`,
        test03: `test03-${i}-${currentIndex}`,
        test04: `test04-${i}-${currentIndex}`,
        test05: `test05-${i}-${currentIndex}`,
        test06: `test06-${i}-${currentIndex}`,
        test07: `test07-${i}-${currentIndex}`,
        random: Math.floor(Math.random() * 100),
        ...children
      });
    }
  }
  return container;
}
```

> index.ts

```typescript
import { treetool, WaitAction, StreamControl, Debounce } from "aftool";
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
  labelProp: "test02", //将test02字段映射成label字段
  valueProp: "random", // 将random字段映射成value字段
  keyProp: "test04"    // 将test04 字段映射成key字段
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
```

- Api

> treetool

| 方法         | 参数                                     | 返回值       | 说明                                                         |
| ------------ | ---------------------------------------- | ------------ | ------------------------------------------------------------ |
| find         | function (tree,callback)                 | any          | 查找树中第一个匹配项 ,查询方法(callback)要返回一个boolean<br />    例如 item => item.value===3; <br />这就是查询树中value值为3的项 |
| fliter       | function(tree,callback)                  | Array\<any\> | 返回匹配的数组, callback   (item,deep) => ....  其中deep当前项的深度 |
| toMap        | function(tree,key)                       | Object       | 返回根据key归类的字面量                                      |
| search       | function(tree,condition,containChildren) | Array\<any\> | 查询匹配的项, condition为查询条件,{keyword:"heheda"} 此条件为查询项中字段keyword 包含heheda字符的项,containChildren,为查询结果中是否保留该项的子项默认false |
| standardized | function(tree,config,containMeta)        | Tree         | 返回格式化过后的tree结构 config:映射字段配置,containMeta是否包含除配置以外的字段 |

>`StreamControl ` 和`Debounce` 防抖

-  StreamControl 相当于公侧一次只能进一个防抖函数
- Debounce 相当于私厕 在用的时候要先建立一个自己的**

- 用法

```javascript
import {StreamControl } from "aftool"

function method(params){
    //此公厕同一时间只能进一个
    StreamControl.debounce(
        ()=>{
            //做点什么吧....
        },
        500 //防抖500ms 默认300毫秒
    )
}

function method2(params){
    //此公厕同一时间只能进一个
    StreamControl.debounce(
        ()=>{
            //做点什么吧....
        },
        500 //防抖500ms 默认300毫秒
    )
} 
//如果有程序同时调用mehod和method2 就会混乱 打架...
//注意是同时..................  如果两个方法明显不在同一时间触发,就不必考虑这个问题

//在某个input或者其他事件中调用这个 method 就会实现防抖500毫秒的功效
```

```javascript
import {Debounce } from "aftool"
//新建私人公厕  ...可以建N个互不影响
const myDebounce = new Debounce() 
function method(params){
   myDebounce.go(
        ()=>{
            //做点什么吧....
        },
        500 //防抖500ms 默认300毫秒
    )
}
//在某个input或者其他事件中调用这个 method 就会实现防抖500毫秒的功效
```

> `WaitAction` 等待执行 参考example 适用 当两以上个异步 执行时 并不知道哪个先完成,但是某个操作要在这几个异步完成后才能执行的情况,用WaitAction 将几个异步插入几个钩子,进行依次执行这里面的钩子,例如 这边有两个 异步数据获取途径为01 , 02 ,两者来的时机我并不知道,也不好把控,但是有一个操作必须在两者全部获取到的情况下才能执行;
>
> 步骤
>
> 1. 新建对象 const waitAction = new WaitAction(["01",02])  //安插钩子
>
> 2. 设置最终要执行的方法 waitAction.setActionFunc(function(params){.....}) //设置目标操作
>
> 3. 在任意时刻放心大胆的设置 执行函数 waitAction.action(params) //这边的参数就是上面设置的函数的所需参数
>
> 4. 触发钩子 当01完成之后 用waitAction.ready("01")标记此异步完成
>
> ​                  当02完成之后 用waitAction.ready("02") 标记此异步完成  
>
>  在两个操作完成之后会自动调用操作方法一次  
>
> 5. 如果想再次执行这个过程 waitAction.reset() ,不然在调用ready的时候他认为全部条件已满足,就会直接执行目标操作.

