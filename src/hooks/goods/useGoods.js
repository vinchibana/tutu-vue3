import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";

export default function useGoods() {
  const route = useRoute();
  const store = useStore();
  const result = ref(null);

  const getGoodsDetail = (id) => {
    getGoodsDetailById(id).then((res) => {
      result.value = res.result;
    });
  };
  getGoodsDetail(route.params.id);
  onBeforeRouteUpdate((to) => {
    getGoodsDetail(route.params.id);
  });

  const onSpecChange = (data) => {
    result.value.price = data.price;
    result.value.oldPrice = data.oldPrice;
    result.value.inventory = data.inventory; //商品库存
    result.value.currentSelectedSkuId = data.skuId; //商品skuid
    result.value.currentSelectedSkuText = data.specsText;
  };

  const count = ref(1)
  return { result, onSpecChange ,count};
}
