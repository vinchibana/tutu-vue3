import store from "@/store";

export default function authGuard(to, from, next) {
  // 需要登录的地址
  const requestLogin = ["checkout", "member"];
  // 判断跳转页面是否需要拦截守卫
  if (requestLogin.includes(to.path.split("/")[1])) {
    // 判断是否已登录
    if (!store.state.user.profile.token) {
      store.commit("user/setRedirectURL", to.fullPath);
      next({ path: "/login", query: { redirectURL: to.fullPath } });
    } else {
      next(); // 已登录
    }
  } else {
    next(); // 无需登录
  }
}


