import mitt from "mitt";
export class JSCore {
  constructor() {
    this.parent = null;
    this.worker = null;
    this.event = mitt();
  }
  async init() {
    const jsContent = await fetch("http://127.0.0.1:3100/logic/core.js");
    const codeString = await jsContent.text();
    const jsBlob = new Blob([codeString], { type: "application/javascript" });
    const urlObj = window.URL.createObjectURL(jsBlob);
    this.worker = new Worker(urlObj);
    this.worker.addEventListener("message", (e) => {
      const msg = e.data;
      this.event.emit("message", msg);
    });
  }

  addEventListener(type, handler) {
    this.event.on(type, handler);
  }

  postMessage(msg) {
    this.worker.postMessage(msg);
  }
}
