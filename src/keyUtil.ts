export class KeyUtil {
  static guid(seed?: string): string {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    seed = seed || "";
    return `${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}${seed}${s4()}`;
  }
}
