<template>
  <div class="xtx-confirm">
    <div class="wrapper">
      <div class="header">
        <h3>{{ title }}</h3>
        <a
          href="javascript:"
          class="iconfont icon-close-new"
          @click="onCancel"
        ></a>
      </div>

      <div class="body">
        <i class="iconfont icon-warning"></i>
        <span>{{ content }}</span>
      </div>

      <div class="footer">
        <CartButton size="mini" type="grey" @click="onCancel">取消</CartButton>
        <CartButton size="mini" type="primary" @click="onConfirm">确认</CartButton>
      </div>
    </div>
  </div>
</template>

<script>
import CartButton from "@/components/library/CartButton";
import { onMounted, ref } from "vue";

export default {
  name: "Confirm",
  components: { CartButton },
  props: {
    title: {
      type: String,
      default: "温馨提示",
    },
    content: {
      type: String,
      default: "",
    },
    onConfirm: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const show = ref(false);
    onMounted(() => {
      show.value = true;
    });
    return { show };
  },
};
</script>

<style scoped lang="less">
.xtx-confirm {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8888;
  background: rgba(0, 0, 0, 0.5);
  transition: all 0.4s;
  &.fade {
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 400px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.4s;
    &.fade {
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .header,
    .footer {
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: right;
      .xtx-button {
        margin-left: 20px;
      }
    }
    .header {
      position: relative;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 15px;
        top: 15px;
        font-size: 20px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
/* 动画效果 */
.xtx-confirm {
  background: rgba(0, 0, 0, 0);
  .wrapper {
    transform: translate(-50%, -60%);
    opacity: 0;
  }
}
</style>
