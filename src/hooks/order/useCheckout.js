import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { createOrder, createOrderById, submitOrder } from "@/api/order";
import MsgService from "@/components/library/MsgService";

export default function useCheckout() {
  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  const order = ref(null);
  // checkoutAddress 子组件实例，通过 ref 唤起
  const checkoutAddressInstance = ref(null);

  // 路由中有 id 时，据此创建订单
  if (route.query.id) {
    createOrderById(route.query.id).then((data) => {
      order.value = data.result;
    });
  } else {
    // 无 id 时根据服务器购物车创建订单
    createOrder().then((data) => {
      order.value = data.result;
    });
  }

  const onSubmitOrder = () => {
    //
    const orderParams = {
      goods: order.value.goods.map((item) => ({
        skuId: item.skuId,
        count: item.count,
      })),
      // 从 checkoutAddress Vue 实例当中获取当前 address
      addressId: checkoutAddressInstance.value.finalAddress?.id,
      deliveryTimeType: 1,
      payType: 1,
      payChannel: 1,
      buyerMessage: "",
    };

    if (!orderParams.addressId) {
      return MsgService({ type: "error", text: "请添加收货地址" });
    }
    submitOrder(orderParams)
      .then((data) => {
        // 1.跳转到支付页面，将订单id作为路由参数
        router.push({
          path: "/checkout/pay",
          query: {
            orderId: data.result.id,
          },
        });
        // 2.将服务端购物车中的商品同步到客户端
        store.dispatch("cart/updateCartGoodsById");
      })
      .catch(() => {
        MsgService({ type: "error", text: "订单提交失败！" });
      });
  };

  return { order, checkoutAddressInstance, onSubmitOrder };
}
