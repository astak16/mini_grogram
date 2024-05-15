import { isFunction } from "lodash";

const lifecycleMethods = ["onLaunch", "onShow", "onHide"];

export class App {
  constructor(moduleInfo, openInfo) {
    this.moduleInfo = moduleInfo;
    this.openInfo = openInfo;
    this.init();
  }
  init() {
    this.initLifecycle();
    this.callLifecycle();
  }

  initLifecycle() {
    lifecycleMethods.forEach((name) => {
      if (!isFunction(this.moduleInfo[name])) return;
      this[name] = this.moduleInfo[name].bind(this);
    });
  }

  callLifecycle() {
    const { scene, pagePath, query } = this.openInfo;
    const options = {
      scene,
      query: pagePath,
      query,
    };
    this.onLaunch(options);
    this.onShow(options);
  }
  callShowLifecycle() {
    const { scene, pagePath, query } = this.openInfo;
    const options = {
      scene,
      query: pagePath,
      query,
    };

    this.onShow(options);
  }
}
