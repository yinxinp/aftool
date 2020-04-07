/**
 * 生成dom元素
 * domData [tag,styleObject,eventsObject,children<domData>]
 * 例如['div',{backgroundColor:'red'},{click:(ele)=>{console.log(ele)}},[
 *  ['span',null,"你是蠢猪屎么？"]
 * ]]
 * tag也可以是dom元素
 */
export declare function createDom(tag: any, props?: any, children?: any): HTMLElement;
