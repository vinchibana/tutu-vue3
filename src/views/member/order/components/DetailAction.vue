<template>
  <div class="detail-action">
    <div class="state">
      <span class="iconfont icon-order-unpay"></span>
      <p>待支付</p>
    </div>
    <div class="info">
      <p>订单编号：{{ orderDetail.id }}</p>
      <p>下单时间：{{ orderDetail.createTime }}</p>
    </div>
    <div class="btn">
      <!-- 待付款 -->
      <template v-if="orderDetail.orderState === 1">
        <CartButton
          type="primary"
          size="small"
          @click="$route.push('/checkout/pay?orderId=' + orderDetail.id)"
          >立即付款</CartButton
        >
        <CartButton
          type="gray"
          size="small"
          @click="onCancelOrderHandler(orderDetail.id)"
          >取消订单</CartButton
        >
      </template>
      <!-- 待发货，再次购买 -->
      <template v-if="orderDetail.orderState === 2">
        <CartButton
          type="primary"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
        >
          再次购买
        </CartButton>
      </template>
      <template v-if="orderDetail.orderState === 3">
        <CartButton
          type="primary"
          size="small"
          @click="onConfirmReceiveButtonClick(orderDetail.id)"
        >
          确认收货
        </CartButton>
        <CartButton
          type="plain"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
        >
          再次购买
        </CartButton>
      </template>
      <template v-if="orderDetail.orderState === 4">
        <CartButton
          type="primary"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
        >
          再次购买
        </CartButton>
        <CartButton type="plain" size="small"> 评价商品 </CartButton>
        <CartButton type="gray" size="small"> 申请售后 </CartButton>
      </template>
      <template v-if="orderDetail.orderState === 5">
        <CartButton
          type="primary"
          size="small"
          @click="onBuyAgain(orderDetail.id)"
        >
          再次购买
        </CartButton>
        <CartButton type="plain" size="small"> 查看评价 </CartButton>
        <CartButton type="gray" size="small"> 申请售后 </CartButton>
      </template>
    </div>
  </div>

  <CancelOrder
    ref="cancelOrderInstance"
    @onReloadOrderList="$emit('onReloadOrderList')"
  ></CancelOrder>
</template>

<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import ConfirmService from "@/components/library/ConfirmService";
import MsgService from "@/components/library/MsgService";
import { confirmReceiptGoods } from "@/api/member";
import CancelOrder from "@/views/member/order/components/CancelOrder";

export default {
  name: "DetailAction",
  components: { CancelOrder },
  emits: ["onReloadOrderList"],
  props: {
    orderDetail: {
      type: Object,
      default: () => ({}),
    },
    getOrderDetail: {
      type: Function,
      default: () => ({}),
    },
  },
  setup(props, { emit }) {
    const router = useRouter();
    const cancelOrderInstance = ref(null);
    const onCancelOrderHandler = (id) => {
      cancelOrderInstance.value.visible = true;
      cancelOrderInstance.value.id = id;
    };

    const onConfirmReceiveButtonClick = async (id) => {
      try {
        await ConfirmService({
          title: "确认收货",
          content: "确定要进行收货吗？",
        });
        await confirmReceiptGoods(id);
        MsgService({ type: "success", text: "确认收货成功" });
        emit("onReloadOrderList");
      } catch {
        return false;
      }
    };

    const onBuyAgain = (id) => {
      router.push(`/checkout/order?id=${id}`);
    };

    return {
      cancelOrderInstance,
      onBuyAgain,
      onCancelOrderHandler,
      onConfirmReceiveButtonClick,
    };
  },
};
</script>

<style scoped lang="less">
.detail-action {
  height: 180px;
  width: 100%;
  display: flex;
  align-items: center;
  .state {
    width: 220px;
    text-align: center;
    .iconfont {
      font-size: 40px;
      color: @xtxColor;
    }
    p {
      font-size: 16px;
      color: #666;
      margin-bottom: 10px;
    }
  }
  .info {
    width: 240px;
    line-height: 30px;
    p {
      color: #999;
    }
  }
  .btn {
    flex: 1;
    text-align: right;
    margin-right: 100px;
    .xtx-button {
      margin-left: 20px;
    }
  }
}
</style>
