import axios from "axios";
import store from "@/store";
import router from "@/router";

export const PAY_CALLBACK = process.env.VUE_APP_PAY_CALLBACK;
export const baseURL = "https://pcapi-xiaotuxian-front-devtest.itheima.net";
//export const baseURL = "https://apipc-xiaotuxian-front.itheima.net/";

const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const { profile } = store.state.user;
    if (profile.token) {
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    if (err.response && err.response.status === 400) {
      store.commit("user/setUser", {});
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath);
      router.push("/login?redirectUrl=" + fullPath);
    }
    return Promise.reject(err);
  }
);

export default (url, method, submitData, option) => {
  return instance({
    url,
    method,
    // 1. 如果是get请求  需要使用params来传递submitData   ?a=10&c=10
    // 2. 如果不是get请求  需要使用data来传递submitData   请求体传参
    // [] 设置一个动态的key, 写js表达式，js表达式的执行结果当作KEY
    [method.toLowerCase() === "get" ? "params" : "data"]: submitData,
    option,
  });
};
