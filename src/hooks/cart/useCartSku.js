import { useStore } from "vuex";
import { ref } from "vue";
import { getSkuInfoById } from "@/api/cart";
import MsgService from "@/components/library/MsgService";

// props: {attrsText,skuId}
export default function useCartSku(props) {
  const store = useStore();
  const specsAndSkus = ref(null);
  const loadingSku = ref(false);

  // 规格弹出组件 target、是否显示状态 visible、显示与隐藏方法
  const target = ref(null);
  const visible = ref(false);

  const show = () => {
    visible.value = true;
    loadingSku.value = true;

    getSkuInfoById(props.skuId).then((res) => {
      specsAndSkus.value = res.result;
      loadingSku.value = false;
    });
  };

  const hide = () => {
    visible.value = false;
  };

  const toggle = () => {
    visible.value ? hide() : show();
  };

  // 存储用户选择的新的商品规格
  let newSku = null;
  const onSpecChange = (sku) => {
    newSku = sku;
  };

  const submitSku = () => {
    hide();
    if (!newSku || (newSku && newSku.skuId === props.skuId)) {
      return MsgService({ type: "warn", text: "商品规格信息没有发生变化" });
    }
    store.dispatch("cart/updateGoodsOfCartBySkuChanged", {
      oldSkuId: props.skuId,
      newSku,
    });
  };

  return {
    visible,
    toggle,
    target,
    specsAndSkus,
    loadingSku,
    onSpecChange,
    submitSku,
  };
}
