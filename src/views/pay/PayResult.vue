<template>
  <Layout>
    <div class="xtx-pay-page">
      <div class="container">
        <BreadCrumb>
          <BreadItem path="/">首页</BreadItem>
          <BreadItem path="/cart">购物车</BreadItem>
          <BreadItem>支付结果</BreadItem>
        </BreadCrumb>

        <div class="pay-result">
          <span class="iconfont icon-queren2 green"></span>
          <p class="tit">订单支付成功</p>
          <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
          <p>
            支付方式：<span>{{
              info.payChannel === 1 ? "支付宝" : "微信"
            }}</span>
          </p>
          <p>
            支付金：<span>{{ info?.payMoney }}</span>
          </p>
          <div class="btn">
            <CartButton
              type="primary"
              style="margin-right: 20px"
              @click="$router.push('/member/order')"
            >
              查看订单
            </CartButton>
            <CartButton type="grey" @click="$router.push('/')"
              >进入首页</CartButton
            >
          </div>
          <p class="alert">
            <span class="iconfont icon-tip"></span>
            温馨提示：不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
          </p>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { getOrderInfoById } from "@/api/order";

export default {
  name: "PayResult",
  components: { Layout },
  setup() {
    const route = useRoute();
    const info = ref(null);
    getOrderInfoById(route.query.orderId).then((data) => {
      info.value = data.result;
    });

    return { info };
  },
};
</script>

<style scoped lang="less">
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  > .iconfont {
    font-size: 100px;
  }
  .green {
    color: #1dc779;
  }
  .red {
    color: @priceColor;
  }
  .tit {
    font-size: 24px;
  }
  .tip {
    color: #999;
  }
  p {
    line-height: 40px;
    font-size: 16px;
  }
  .btn {
    margin-top: 50px;
  }
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>
