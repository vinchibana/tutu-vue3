import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import ConfirmService from "@/components/library/ConfirmService";
import MsgService from "@/components/library/MsgService";

export default function useCart() {
  const router = useRouter();
  const store = useStore();

  const effectiveGoodsList = computed(
    () => store.getters["cart/effectiveGoodsList"]
  );
  const effectiveGoodsCount = computed(
    () => store.getters["cart/effectiveGoodsCount"]
  );
  const effectiveGoodsPrice = computed(
    () => store.getters["cart/effectiveGoodsPrice"]
  );

  // 删除单个商品
  const deleteCartGoodsById = (skuId) => {
    ConfirmService({ content: "确定要删除该商品吗？" })
      .then(() => {
        store.dispatch("cart/deleteCartGoodsById", skuId).then(() => {
          MsgService({ type: "success", text: "购物车的商品删除成功" });
        });
      })
      .catch(() => {});
  };

  const invalidGoodsList = computed(
    () => store.getters["cart/invalidGoodsList"]
  );

  const userSelectedGoodsCount = computed(
    () => store.getters["cart/userSelectedGoodsCount"]
  );

  const userSelectedGoodsPrice = computed(
    () => store.getters["cart/userSelectedGoodsPrice"]
  );

  const updateCartList = () => {
    store.dispatch("cart/updateCartList").then(() => {
      MsgService({ type: "success", text: "本地购物车的商品信息更新成功" });
    });
  };

  const selectedAllBtnStatus = computed(
    () => store.getters["cart/selectAllBtnStatus"]
  );

  const deleteBatchCartGoods = (flag) => {
    let content = "";
    if (flag === "userSelectedGoodsList") {
      if (userSelectedGoodsCount.value === 0) {
        MsgService({ type: "warn", text: "请选择要删除的商品" });
        return;
      }
      content = "您确定要删除所有选中的商品吗";
    } else if (flag === "invalidGoodsList") {
      if (invalidGoodsList.value.length === 0) {
        MsgService({ type: "warn", text: "没有失效的商品" });
        return;
      }
      content = "您确定要清空所有失效的商品吗";
    }

    ConfirmService({ content }).then(() => {
      store
        .dispatch("cart/deleteCartGoodsByUserSelectedOrInvalid", flag)
        .then(() => {
          MsgService({ type: "success", text: "商品删除成功" });
        })
        .catch(() => {});
    });
  };

  const changeCartGoodsCountById = ({ skuId, count }) => {
    store.dispatch("cart/updateCartGoodsById", { skuId, count });
  };

  const checkout = () => {
    if (userSelectedGoodsCount.value === 0) {
      MsgService({ type: "warn", text: "请至少选择一个商品" });
    }
    router.push("/checkout/order");
  };

  return {
    effectiveGoodsPrice,
    effectiveGoodsCount,
    effectiveGoodsList,
    deleteBatchCartGoods,
    deleteCartGoodsById,
    invalidGoodsList,
    userSelectedGoodsPrice,
    userSelectedGoodsCount,
    updateCartList,
    selectedAllBtnStatus,
    changeCartGoodsCountById,
    checkout,
  };
}
