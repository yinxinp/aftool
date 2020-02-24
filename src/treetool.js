export function treeFilter(array) {
  console.log("array==========>", array);
  return array;
}

export function waitTime(func, delay = 0) {
  return new Promise(
    r => {
      setTimeout(() => {
        const result = func && func();
        r(result);
      }, delay);
    },
    rj => {
      rj();
      throw new Error("执行错误");
    }
  );
}
