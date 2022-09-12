import { useRoute } from "vue-router";
import { ref } from "vue";
import countdown from "@/utils/countdown";
import { getOrderInfoById } from "@/api/order";
import { baseURL, PAY_CALLBACK } from "@/utils/request";
import dayjs from "dayjs";

export default function usePay() {
  const route = useRoute();
  // 订单信息
  const info = ref(null);
  const { count, start } = countdown();

  getOrderInfoById(route.query.orderId).then((data) => {
    info.value = data.result;
    // 支付倒计时
    start(data.result.countdown);
  });

  const redirectUrl = encodeURIComponent(PAY_CALLBACK);
  const payUrl = `${baseURL}/pay/aliPay?orderId=${route.query.orderId}&redirect=${redirectUrl}`;
  const isPaying = ref(false);

  return { info, count, payUrl, isPaying, dayjs };
}
