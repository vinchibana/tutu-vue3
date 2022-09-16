<template>
  <Layout>
    <div class="xtx-pay-page">
      <div class="container">
        <BreadCrumb>
          <BreadItem path="/">首页</BreadItem>
          <BreadItem path="/cart">购物车</BreadItem>
          <BreadItem>支付订单</BreadItem>
        </BreadCrumb>

        <!-- 付款信息 -->
        <div class="pay-info">
          <span class="iconfont icon icon-queren2"></span>
          <div class="tip">
            <p>订单提交成功！请尽快完成支付。</p>
            <p v-if="count > 0">
              支付还剩 <span>{{ dayjs.unix(count).format("mm分ss秒") }}</span
              >，超时后将取消订单
            </p>
            <p v-else>订单已超时</p>
          </div>
          <div class="amount">
            <span>应付总额：</span>
            <span>&yen;{{ info?.payMoney.toFixed(2) }}</span>
          </div>
        </div>

        <div class="pay-type" v-if="count > 0">
          <p class="head">选择以下支付方式付款</p>
          <div class="item">
            <p>支付平台</p>
            <a href="javascript:" class="btn wx"></a>
            <a
              :href="payUrl"
              class="btn alipay"
              target="_blank"
              @click="isPaying = true"
            ></a>
          </div>
          <div class="item">
            <p>支付方式</p>
            <a class="btn" href="javascript:">招商银行</a>
            <a class="btn" href="javascript:">工商银行</a>
            <a class="btn" href="javascript:">建设银行</a>
            <a class="btn" href="javascript:">农业银行</a>
            <a class="btn" href="javascript:">交通银行</a>
          </div>
        </div>
      </div>
    </div>
  </Layout>

  <Dialog title="正在支付..." v-model:visible="isPaying">
    <div class="pay-wait">
      <img src="@/assets/images/load.gif" alt="" />
      <div v-if="info">
        <p>如果支付成功：</p>
        <router-link :to="`/member/order/${info.id}`">查看订单</router-link>
        <p>如果支付失败：</p>
        <router-link to="/">查看相关疑问</router-link>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Layout from "@/components/Layout";
import { useRoute } from "vue-router";
import { ref } from "vue";
import countdown from "@/utils/countdown";
import { getOrderInfoById } from "@/api/order";
import { baseURL, PAY_CALLBACK } from "@/utils/request";
import dayjs from "dayjs";

export default {
  name: "Pay",
  components: { Layout },
  setup() {
    const route = useRoute();
    // 订单信息
    const info = ref(null);
    const { count, start } = countdown();

    getOrderInfoById(route.query.orderId).then((data) => {
      info.value = data.result;
      console.log(info.value);
      console.log(info.value.skus);
      // 支付倒计时
      start(data.result.countdown);
    });

    const redirectUrl = encodeURIComponent(PAY_CALLBACK);
    // 后端处理
    const payUrl = `${baseURL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redirectUrl}`;
    const isPaying = ref(false);

    return { info, count, payUrl, isPaying, dayjs };
  },
};
</script>

<style scoped lang="less">
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;
  .icon {
    font-size: 80px;
    color: #1dc779;
  }
  .tip {
    padding-left: 10px;
    flex: 1;
    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }
      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }
      &:last-child {
        color: @priceColor;
        font-size: 20px;
      }
    }
  }
}
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;
    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;
    &.active,
    &:hover {
      border-color: @xtxColor;
    }
    &.alipay {
      background: url("@/assets/images/zfb.png") no-repeat center / contain;
    }
    &.wx {
      background: url("@/assets/images/wx.jpeg") no-repeat center / contain;
    }
  }
}
.pay-wait {
  display: flex;
  justify-content: space-around;
  p {
    margin-top: 30px;
    font-size: 14px;
  }
  a {
    color: @xtxColor;
  }
}
</style>
