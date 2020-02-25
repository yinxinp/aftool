/**
 * 将多个异步按顺序排成一维并执行目标函数
 */
export class WaitAction {
  private wait: string[];
  private okList: any;
  private valueKey?: string;
  private myGenerator?: Generator;
  private actionFunc?: Function;
  /**
   * 默认构造函数
   * @param waitKeys 等待的标志位
   * @param actionFunc 等待完成之后需要执行的函数
   */
  constructor(waitKeys: string[] = [], actionFunc?: Function) {
    this.wait = waitKeys;
    if (actionFunc) {
      this.actionFunc = actionFunc;
    }
    this.okList = {};
    this.myGenerator = this.generatorFunc();
    this.goNext();
  }
  action = (value?: string) => {
    this.valueKey = value;
    this.goNext();
  };
  ready = (key: string, func = () => {}) => {
    this.okList[key] = func;
    this.goNext();
  };
  reset = (waitKeys: string[]) => {
    if (waitKeys) {
      this.wait = waitKeys;
    }
    this.okList = {};
    this.myGenerator = this.generatorFunc();
    this.goNext();
  };
  /**
   * 设置最后要执行的函数
   */
  setActionFunc = (func: Function) => {
    this.actionFunc = func;
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
        if (over) return;
      }
    }
    while (true) {
      this.actionFunc && this.actionFunc(this.valueKey);
      this.valueKey = undefined;
      over = yield;
      if (over) return;
    }
  }
}
