<template>
  <form @submit="onSubmitHandler" class="xtx-form">
    <div class="xtx-form-item">
      <div class="field">
        <i class="iconfont icon-user"></i>
        <input
          type="text"
          class="input"
          placeholder="请输入用户名"
          v-model="accountField"
        />
      </div>
      <div v-if="accountError" class="error">{{ accountError }}</div>
    </div>

    <div class="xtx-form-item">
      <div class="field">
        <i class="iconfont icon-phone"></i>
        <input
          type="text"
          class="input"
          placeholder="请输入手机号"
          v-model="mobileField"
        />
      </div>
      <div v-if="mobileError" class="error">{{ mobileError }}</div>
    </div>

    <div class="xtx-form-item">
      <div class="field">
        <i class="iconfont icon-code"></i>
        <input class="input" type="text" placeholder="" v-model="codeField"/>
      </div>
    </div>
  </form>
</template>

<script>
import useBindNewAccountFormValid from "@/hooks/login/useBindNewAccountFormValid";

export default {
  name: "LoginCallbackBindPatch",
  props: {
    unionId: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const { onSubmitHandler, ...bindNewAccountValid } =
      useBindNewAccountFormValid(props);
    return {
      onSubmitHandler,
      ...bindNewAccountValid,
    };
  },
};
</script>

<style scoped lang="less">
.code {
  position: absolute;
  right: 0;
  top: 0;
  line-height: 50px;
  width: 80px;
  color: #999;
  &:hover {
    cursor: pointer;
  }
}
</style>
