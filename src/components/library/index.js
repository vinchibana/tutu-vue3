/**
 * 全局组件注册——应用级
 */

import MsgService from "@/components/library/MsgService";
import directiveLazy from "@/components/directives/lazy";

// require.context(
//   directory,
//   (useSubdirectories = true),
//   (regExp = /^\.\/.*$/),
//   (mode = 'sync')
// );
const importFn = require.context("./", false, /\.vue$/);
const keys = importFn.keys();

const library = {
  install(app) {
    directiveLazy(app);
    keys.forEach((item) => {
      const component = importFn(item).default;
      app.component(component.name, component);
    });
    app.config.globalProperties.$message = MsgService;
  },
};

export default library;
