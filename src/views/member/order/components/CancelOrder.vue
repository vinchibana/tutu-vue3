<template>
  <Dialog title="取消订单" v-model:visible="visible">
    <template v-slot:default>
      <div class="cancel-info">
        <p>取消订单后，本单享有的优惠可能会一并取消，是否继续？</p>
        <p class="tip">请选择取消订单的原因（必选）：</p>
        <div class="btn">
          <a
            v-for="(item, i) in cancelReason"
            :key="i"
            :class="{ active: item === selectedReason }"
            @click="selectedReason = item"
            >{{ item }}</a
          >
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <CartButton
        @click="visible = false"
        type="gray"
        style="margin-right: 20px"
      >
        取消
      </CartButton>
      <CartButton @click="onConfirmCancel" type="primary"> 确认 </CartButton>
    </template>
  </Dialog>
</template>

<script>
import { getCurrentInstance, ref } from "vue";
import { cancelReason } from "@/api/constants";
import { cancelOrder } from "@/api/member";
import MsgService from "@/components/library/MsgService";

export default {
  name: "CancelOrder",
  setup(props, { emit }) {
    const visible = ref(false);
    const selectedReason = ref("");
    const { proxy } = getCurrentInstance();
    const onConfirmCancel = async () => {
      try {
        await cancelOrder({ id: proxy.id, cancelReason: selectedReason.value });
        MsgService({ type: "success", text: "取消成功" });
        visible.value = false;
        emit("onReloadOrderList");
      } catch (error) {
        const msg = error.err.response.data.message;
        MsgService({ type: "error", text: `订单取消失败: ${msg}` });
      }
    };

    return { visible, cancelReason, selectedReason, onConfirmCancel };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog :deep(.wrapper) {
  width: 620px;
}
.cancel-info {
  p {
    font-size: 16px;
    line-height: 35px;
    &.tip {
      color: #999;
    }
  }
  .btn {
    padding-top: 21px;
    display: flex;
    flex-wrap: wrap;
    a {
      width: 250px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background-color: #ffffff;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 20px;
      color: #666;
      &:nth-child(2n) {
        margin-right: 0;
      }
      &:hover,
      &.active {
        background-color: #e3f9f4;
        border-color: @xtxColor;
        cursor: pointer;
      }
    }
  }
}
</style>
