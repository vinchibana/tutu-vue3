import store from "@/store";

export default function authGuard(to, from, next) {
  const requestLogin = ["checkout", "member"];
  // 跳转路径当中包含 requestLogin 数组中的元素
  if (requestLogin.includes(to.path.split("/")[1])) {
    if (!store.state.user.profile.token) {
      store.commit('user')
    }
  }
}
