<template>
  <router-view />
</template>

<script>

import request from "@/utils/request";

export default {
  setup() {
     request("/message",'get').then((res) => {
      console.log("hello msw", res);
    });
  },
};
</script>
<style lang="less">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
