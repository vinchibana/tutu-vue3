<template>
  <MemberLayout>
    <div class="member-order">
      <Tabs v-model:active="active">
        <TabTitle v-for="status in orderStatus" :key="status.name">{{
          status.label
        }}</TabTitle>
      </Tabs>

      <!-- 订单列表 -->
      <div class="order-list" v-if="orderList">
        <div class="loading" v-if="loading"></div>
        <template v-if="orderList && !loading && orderList.items.length > 0">
          <OrderItem
            v-for="item in orderList.items"
            :order="item"
            :key="item.id"
            @onCancelOrder="onCancelOrder"
            @onReloadOrderList="getData"
          >
          </OrderItem>
        </template>
        <div v-if="!loading && orderList?.items?.length === 0" class="none">
          暂无数据
        </div>
        <Pagination
          v-if="orderList && totalPage > 1"
          v-model:page="reqParams.page"
          :pageSize="reqParams.pageSize"
          :count="totalCount"
        ></Pagination>
      </div>
    </div>
  </MemberLayout>
  <CancelOrder ref="cancelOrderInstance" @onReloadOrderList="getData" />
</template>

<script>
import CancelOrder from "@/views/member/order/components/CancelOrder";
import MemberLayout from "@/components/MemberLayout";
import { orderStatus } from "@/api/constants";
import OrderItem from "@/views/member/order/OrderItem";
import { ref, watch } from "vue";
import { getLogisticsByOrderId, getOrderList } from "@/api/member";

export default {
  name: "OrderList",
  components: { MemberLayout, OrderItem, CancelOrder },
  setup() {
    const active = ref(0);
    const orderList = ref();
    const loading = ref(false);
    const reqParams = ref({
      page: 1,
      pageSize: 4,
      orderState: 0,
    });
    const totalCount = ref(0);
    const totalPage = ref(0);
    const cancelOrderInstance = ref(null);
    const orderLogisticsInstance = ref(null);

    const getData = () => {
      loading.value = true;
      getOrderList(reqParams.value).then((data) => {
        orderList.value = data.result;
        loading.value = false;
        totalCount.value = data.result.counts;
        totalPage.value = data.result.pages;
      });
    };

    getData();
    // 监控请求参数变化，重新获取订单列表数据
    watch(reqParams.value, () => {
      getData();
    });

    // 监听当前选项卡
    watch(active, (current) => {
      reqParams.value.page = 1;
      reqParams.value.orderState = current;
    });

    const onCancelOrder = (id) => {
      cancelOrderInstance.value.visible = true;
      cancelOrderInstance.value.id = id;
    };

    const onViewLogistics = (id) => {
      getLogisticsByOrderId(id).then((data) => {
        orderLogisticsInstance.value.logistics = data.result;
        orderLogisticsInstance.value.visible = true;
      });
    };
    return {
      active,
      orderList,
      orderStatus,
      reqParams,
      loading,
      totalPage,
      totalCount,
      cancelOrderInstance,
      orderLogisticsInstance,
      onCancelOrder,
      onViewLogistics,
      getData,
    };
  },
};
</script>

<style lang="less" scoped>
.member-order {
  height: 100%;
  background: #fff;
  position: relative;
}

.order-list {
  background: #fff;
  padding: 20px;
  position: relative;
}

.loading {
  height: calc(100% - 60px);
  width: 100%;
  min-height: 400px;
  position: absolute;
  left: 0;
  top: 60px;
  background: rgba(255, 255, 255, 0.9) url(../../../assets/images/loading.gif)
    no-repeat center 18%;
}

.none {
  height: 400px;
  text-align: center;
  line-height: 400px;
  color: #999;
  background: rgba(255, 255, 255, 0.9);
}
</style>
