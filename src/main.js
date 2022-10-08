import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css";
import "@/assets/styles/common.less";
import library from "./components/library";

// if (process.env.NODE_ENV === "development") {
//   const worker = require("./mock/worker").default;
//   worker
//     .start({ onUnhandledRequest() {}, quiet: true })
//     .then(() => {})
//     .catch((e) => {
//       console.log(e);
//     });
// }
createApp(App).use(store).use(router).use(library).mount("#app");
