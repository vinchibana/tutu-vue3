<template>
  <Transition name="fade-right" mode="out-in">
    <div class="xtx-bread-item" :key="id">
      <router-link v-if="path" :to="path"><slot /></router-link>
      <span v-else><slot /></span>
    </div>
  </Transition>
</template>

<script>
export default {
  name: "BreadItem",
  props: {
    path: {
      type: String,
    },
    id: {
      type: String,
    },
  },
};
</script>

<style lang="less" scoped>
.xtx-bread-item {
  a {
    color: #666;
    transition: all 0.4s;
    &:hover {
      color: @xtxColor;
    }
  }
}
</style>
