/**
 * 判断参数对象的各个值是否为空或者undfined或者为null
 * @param param 参数对象
 */
export function isAllNullorUndefined(param: any): boolean {
  let result = true;
  if (param) {
    result = !Object.keys(param).some((x) => {
      const property = param[x];
      return (
        (typeof property === "string" && property.trim() !== "") ||
        (typeof property !== "string" && !!property) ||
        property === 0 ||
        property === false
      );
    });
  }
  return result;
}

/**
 * 唯一标识生成器
 * @param {String} seed 种子
 */
export function guid(seed: string) {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  seed = seed || "";
  return `${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}`;
}
