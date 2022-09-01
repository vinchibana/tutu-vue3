<template>
  <div class="xtx-checkbox">
    <i class="iconfont icon-checked" v-if="isChecked" @click="toggle"></i>
    <i class="iconfont icon-unchecked" v-else></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>

<script>
import { useVModel } from "@vueuse/core";
import { unref } from "vue";

export default {
  name: "CheckBox",
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const isChecked = useVModel(props, "modelValue", emit);
    const toggle = () => {
      isChecked.value = !unref(isChecked);
    };

    return { isChecked, toggle };
  },
};
</script>

<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
