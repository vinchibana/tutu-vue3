import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getRelevantGoods } from "@/api/goods";

export default function useGoodsHot(props) {
  const route = useRoute();
  const hotGoods = ref(null);
  const names = { 1: "24小时热销榜", 2: "周热销榜", 3: "总热销榜" };
  const type = props.type;

  const getGoodsHot = (id) => {
    getRelevantGoods({ id, type }).then((res) => {
      hotGoods.value = res.result;
    });
  };

  getGoodsHot(route.params.id);

  onBeforeRouteUpdate((to) => {
    getGoodsHot(to.params.id);
  });

  return { hotGoods, typeName: names[type] };
}
