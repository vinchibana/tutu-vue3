import { ref } from "vue";
import { getRelevantGoods } from "@/api/goods";
import { onBeforeRouteUpdate } from "vue-router";

export default function useGoodsRelevant(goodsId) {
  const sliders = ref(null);

  const getGoodsRelevant = (id) => {
    sliders.value = [];

    getRelevantGoods(id).then((res) => {
      const size = 4;
      const total = Math.ceil(res.result.length / size);
      for (let i = 0; i < total; i++) {
        sliders.value.push(res.result.slice(i * size, i * size + size));
      }
    });
  };

  getGoodsRelevant(goodsId);

  onBeforeRouteUpdate((to) => {
    getGoodsRelevant(to.params.id);
  });

  return { sliders };
}
