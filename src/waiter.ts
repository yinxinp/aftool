/**
 * 将多个异步按顺序排成一维并执行目标函数
 */
export class Waiter {
  private wait: string[];
  private okList: any;
  private myGenerator?: Generator;
  /**
   * 默认构造函数
   * @param waitKeys 等待的标志位
   * @param actionFunc 等待完成之后需要执行的函数
   */
  constructor(waitKeys: string[] = []) {
    this.wait = waitKeys;
    this.okList = {};
    this.myGenerator = this.generatorFunc();
    this.goNext();
  }
  ready = (key: string, func = () => {}) => {
    this.okList[key] = func;
    this.goNext(key);
  };
  reset = (waitKeys: string[]) => {
    if (waitKeys) {
      this.wait = waitKeys;
    }
    this.okList = {};
    this.myGenerator = this.generatorFunc();
    this.goNext();
  };
  destroy = () => {
    this.goNext(true);
    this.myGenerator = undefined;
  };
  private goNext(param?: any) {
    this.myGenerator && this.myGenerator.next(param);
  }

  private *generatorFunc() {
    let over;
    yield;
    for (let i = 0; i < this.wait.length; i++) {
      while (true) {
        const okFunc = this.okList[this.wait[i]];
        if (okFunc) {
          okFunc();
          break;
        }
        over = yield;
        if (over === true) return;
      }
    }
    while (true) {
      over = yield;
      if (over === true) return;
      const targetFunc = this.okList[over];
      targetFunc && targetFunc();
    }
  }
}
