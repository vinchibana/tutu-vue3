import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import MsgService from "@/components/library/MsgService";

export default function useAfterLogin() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  const loginSuccess = async ({ result }) => {
    store.commit("user/setUser", {
      id: result.id, //用户id
      avatar: result.avatar, //用户头像
      nickname: result.nickname, //用户你猜
      account: result.account, //用户账号
      mobile: result.mobile, //用户手机号
      token: result.token, //用户登录令牌
    });

    const redirectURL = route.query.redirectURL || store.state.user.redirectURL;
    router.push(redirectURL || "/").then(() => {
      MsgService({ type: "success", text: "登录成功" });
    });

    // 登录成功后合并本地与远端购物车，更新购物车 list
    await store.dispatch("cart/mergeCart");
    await store.dispatch("cart/updateCartList");
  };

  const loginFailed = (error) => {
    const msg = error.err.response.data.message;
    MsgService({ type: "error", text: msg });
  };

  return { loginFailed, loginSuccess };
}
