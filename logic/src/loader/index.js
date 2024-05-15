import message from "@/message";
import { AppModule } from "./AppModule";
import { PageModule } from "./PageModule";

class Loader {
  constructor() {
    this.staticModules = {};
  }

  loadResources(opts) {
    const { appId, bridgeId, pages } = opts;
    const logicResourcePath = `http://127.0.0.1:3077/mini_resource/${appId}/logic.js`;

    importScripts(logicResourcePath);
    // modRequire("app");
    // pages.forEach((pagePath) => {
    //   modRequire(pagePath);
    // });
    message.send({
      type: "logicResuorceLoaded",
      body: {
        bridgeId,
      },
    });
  }

  getModuleByPath(path) {
    return this.staticModules[path];
  }

  createAppModule(moduleInfo) {
    const appModule = new AppModule(moduleInfo);

    this.staticModules.app = appModule;
  }

  createPageModule(moduleInfo, compileInfo) {
    const pageModule = new PageModule(moduleInfo, compileInfo);
    const { path } = compileInfo;

    this.staticModules[path] = pageModule;
  }

  getInitialDataByPagePath(pagePath) {
    const pageModule = this.staticModules[pagePath];

    return {
      [pagePath]: pageModule.getInitialData(),
    };
  }
}

export default new Loader();
