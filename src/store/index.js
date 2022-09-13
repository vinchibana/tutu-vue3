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
  // vuex-persistedstate 将 user、cart 两部分持久化至 localStorage
  plugins: [
    createPersistedState({
      key: "tutu-state",
      paths: ["user", "cart"],
    }),
  ],
});
