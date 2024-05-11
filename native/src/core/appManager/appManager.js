import { queryPath } from "@/utils/util";
import { getMiniAppInfo } from "@/services";
import { MiniAppSandbox } from "@/core/miniAppSandbox/miniAppSandbox";

export class AppManager {
  static appStack = [];

  static async openApp(opts, wx) {
    const { appId, path, scene } = opts;
    const { pagePath, query } = queryPath(path);
    const { appName, logo } = await getMiniAppInfo(appId);
    const cacheApp = this.getAppById(appId);
    // if (cacheApp) {
    //   wx.presentView(cacheApp, true);
    //   return;
    // }
    const miniApp = new MiniAppSandbox({
      appId,
      scene,
      appName,
      logo,
      pagePath,
      query,
    });
    this.appStack.push(miniApp);
    wx.presentView(miniApp, false);
  }

  static getAppById(appId) {
    for (let i = 0; i < this.appStack.length; i++) {
      if (this.appStack[i].appId === appId) {
        return this.appStack[i];
      }
    }
    return null;
  }

  static async closeApp(miniApp) {
    miniApp.parent.dismissView({ destroy: false });
  }
}
