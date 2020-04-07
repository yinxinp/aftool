/**
 * 生成dom元素
 * domData [tag,styleObject,eventsObject,children<domData>]
 * 例如['div',{backgroundColor:'red'},{click:(ele)=>{console.log(ele)}},[
 *  ['span',null,"你是蠢猪屎么？"]
 * ]]
 * tag也可以是dom元素
 */
export function createDom(tag: any, props?: any, children?: any) {
  const {
    style,
    on: event,
    className,
    attrs,
  }: { style: any; on: any; className: any; attrs: any } = props || {};
  let currentEle: HTMLElement;
  switch (true) {
    case tag instanceof HTMLElement:
      currentEle = tag;
      break;
    case typeof tag === "string" && /\//.test(tag):
      currentEle = parseDom(tag);
      break;
    default:
      currentEle = document.createElement(tag);
  }
  //样式
  Object.keys(style || {}).forEach((key: any) => {
    currentEle.style[key] = style[key];
  });
  //属性
  Object.keys(attrs || {}).forEach((key) => {
    currentEle.setAttribute(key, attrs[key]);
  });
  //事件
  Object.keys(event || {}).forEach((key) => {
    currentEle.addEventListener(key, (e) => {
      event[key](currentEle, e);
    });
  });
  //类名
  if (className) {
    if (Array.isArray(className)) {
      currentEle.classList.add(...className);
    } else {
      currentEle.classList.add(className);
    }
  }
  if (typeof children === "string") {
    currentEle.innerHTML = children;
  } else if (Array.isArray(children) && children.length > 0) {
    const childrenEles = children.reduce((prev, current) => {
      const child = createDom(current);
      return [...prev, child];
    }, []);
    childrenEles.forEach((ele: HTMLElement) => {
      if (ele) {
        currentEle.appendChild(ele);
      }
    });
  } else if (children && children instanceof HTMLElement) {
    currentEle.appendChild(children);
  }
  return currentEle;
}
/**
 * 将一段html字符串转换成dom
 * @param {String} arg htmlString
 */
function parseDom(arg: string): HTMLElement {
  let objE: HTMLElement = document.createElement("div");
  objE.innerHTML = arg;
  return objE.childNodes[0] as HTMLElement;
}
