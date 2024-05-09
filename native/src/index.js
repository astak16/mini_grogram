import "@/less/app.less";
import { Device } from "@/core/device/device";
import { Application } from "@/core/application/application";
import { Home } from "@/pages/home/home";

window.onload = function () {
  const device = new Device();
  const wx = new Application();
  const homePage = new Home();
  wx.initRootView(homePage);
  device.open(wx);
};
