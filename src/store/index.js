import { createStore } from "vuex";
import cart from "@/store/modules/cart";
import user from "@/store/modules/user";
import category from "@/store/modules/category";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    cart,
    user,
    category,
  },
  // 使用 vuex-persistedstate 将状态持久化至 localStorage
  plugins: [
    createPersistedState({
      key: "tutu-state",
      paths: ["user", "cart"],
    }),
  ],
});
