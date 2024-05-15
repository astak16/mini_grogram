import loader from "@/loader";
// import wx from "@/wx";
// import { modRequire, modDefine } from "./amd";

class GlobalApi {
  constructor() {}

  init() {
    global.App = (moduleInfo) => {
      loader.createAppModule(moduleInfo);
    };
    // global.wx = wx;
    // global.modRequire = modRequire;
    // global.modDefine = modDefine;
    global.Page = (moduleInfo, compileInfo) => {
      loader.createPageModule(moduleInfo, compileInfo);
    };
  }
}

export default new GlobalApi();
