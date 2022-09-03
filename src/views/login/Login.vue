<template>
  <LoginHeader>欢迎登录</LoginHeader>
  <section class="login-section">
    <div class="wrapper">
      <nav>
        <a
          href="javascript:"
          :class="{ active: activeName === 'account' }"
          @click="activeName = 'account'"
          >账户登录</a
        >
        <a
          href="javascript:"
          :class="{ active: activeName === 'qrcode' }"
          @click="activeName = 'qrcode'"
          >扫码登录</a
        >
      </nav>

      <LoginForm v-if="activeName === 'account'"/>
      <div class="qrcode-box" v-if="activeName === 'qrcode'">
        <img src="@/assets/images/qrcode.jpg" alt="" />
      </div>
    </div>
  </section>
  <LoginFooter/>
</template>

<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginFooter from "@/views/login/components/LoginFooter";
import LoginForm from "@/views/login/components/LoginForm";
import { ref } from "vue";

export default {
  name: "Login",
  components: { LoginHeader, LoginFooter, LoginForm },
  setup() {
    const activeName = ref("account");
    return { activeName };
  },
};
</script>

<style scoped lang="less">
.login-section {
  background: url(../../assets/images/login-bg.png) no-repeat center / cover;
  height: 488px;
  position: relative;
  .wrapper {
    width: 380px;
    background: #fff;
    min-height: 400px;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    .qrcode-box {
      text-align: center;
      padding-top: 40px;
      p {
        margin-top: 20px;
        a {
          color: @xtxColor;
          font-size: 16px;
        }
      }
    }
    nav {
      height: 55px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;
      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        &:first-child {
          border-right: 1px solid #f5f5f5;
          text-align: left;
        }
        &.active {
          color: @xtxColor;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
