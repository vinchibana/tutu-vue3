<template>
  <MemberLayout>
    <div class="order-detail-page">
      <DetailAction :orderDetail="orderDetail"></DetailAction>
      <StepBar
        v-if="orderDetail"
        :active="orderDetail.orderState === 6 ? 1 : orderDetail.orderState"
      >
        <StepItem title="提交订单" :desc="orderDetail.createTime"></StepItem>
        <StepItem title="付款成功" :desc="orderDetail.payTime"></StepItem>
        <StepItem title="商品发货" :desc="orderDetail.consignTime"></StepItem>
        <StepItem title="确认收货" :desc="orderDetail.endTime"></StepItem>
        <StepItem title="订单完成" :desc="orderDetail.evaluationTime"></StepItem>
      </StepBar>

      <Suspense v-if="orderDetail">
        <template v-slot:default>

        </template>
      </Suspense>
    </div>
  </MemberLayout>
</template>

<script>
import StepItem from "@/components/StepItem";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderDetail } from "@/api/member";
import MemberLayout from "@/components/MemberLayout";
import DetailAction from "@/views/member/order/components/DetailAction";

export default {
  name: "OrderDetail",
  components: { MemberLayout,StepItem, DetailAction },

  setup() {
    const route = useRoute();
    const orderDetail = ref();
    const getData = () => {
      getOrderDetail(route.params.id).then((data) => {
        orderDetail.value = data.result;
      });
    };
    getData();

    return { orderDetail, getData };
  },
};
</script>

<style scoped lang="less">
.order-detail-page {
  background: #fff;
  height: 100%;
}
</style>
