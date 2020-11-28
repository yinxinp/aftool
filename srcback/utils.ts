/**
 * 判断参数对象的各个值是否为空或者undfined或者为null
 * @param param 参数对象
 */
export function isAllNullorUndefined(param: any) :boolean{
  let result = true;
  if (param) {
    result = !Object.keys(param).some(x => {
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
