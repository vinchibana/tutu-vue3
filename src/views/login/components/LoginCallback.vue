<template>
<LoginHeader>联合登录</LoginHeader>
  <section class="container" v-if="loading"></section>
  <LoginCallbackBindPatch />

</template>

<script>
import LoginHeader from "@/views/login/components/LoginHeader";
import LoginCallbackBindPatch from "@/views/login/components/LoginCallbackBindPatch";
import LoginCallbackBindPhone from "@/views/login/components/LoginCallbackBindPhone";

export default {
  name: "LoginCallback",
  components:{
    LoginHeader,
    LoginCallbackBindPatch,
    LoginCallbackBindPhone
  },
  setup() {

  }
};
</script>

<style scoped lang="less">
.container {
  padding: 25px 0;
}
.tab {
  background: #fff;
  height: 80px;
  padding-top: 40px;
  font-size: 18px;
  text-align: center;
  a {
    color: #666;
    display: inline-block;
    width: 350px;
    line-height: 40px;
    border-bottom: 2px solid #e4e4e4;
    i {
      font-size: 22px;
      vertical-align: middle;
    }
    span {
      vertical-align: middle;
      margin-left: 4px;
    }
    &.active {
      color: @xtxColor;
      border-color: @xtxColor;
    }
  }
}
.tab-content {
  min-height: 600px;
  background: #fff;
}

.container {
  padding: 25px 0;
  position: relative;
  height: 730px;
  .unbind {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 25px 0;
    z-index: 99;
    .loading {
      height: 100%;
      background: #fff url(../../../assets/images/load.gif) no-repeat center /
        100px 100px;
    }
  }
}
</style>

