

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
