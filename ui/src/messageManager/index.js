import message from "@/message";
import loader from "@/loader";
import runtimeManager from "@/runtimeManager";

class MessageManager {
  constructor() {
    this.message = message;
    // window.message = message;
  }

  init() {
    this.message.receive("loadResource", (msg) => {
      const { appId, pagePath } = msg;
      console.log("渲染线程接收到的消息：", msg);
      loader.loadResources({ appId, pagePath });
    });
    this.message.receive("updateModule", (msg) => {
      const { id, data } = msg;
      runtimeManager.updateModule({
        id,
        data,
      });
    });
    this.message.receive("setInitialData", (msg) => {
      const { bridgeId, pagePath } = msg;
      loader.setInitialData(msg.initialData);
      runtimeManager.firstRender({ pagePath, bridgeId });
    });
    // this.message.receive("showToast", (msg) => {
    //   window.wxComponentsAPI.showToast({
    //     ...msg,
    //   });
    // });
  }
}

export default new MessageManager();
