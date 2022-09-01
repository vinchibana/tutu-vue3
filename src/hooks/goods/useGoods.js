import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { getGoodsDetailById } from "@/api/goods";
import MsgService from "@/components/library/MsgService";

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

  const addToCart = () => {
    if (!result.value.currentSelectedSkuId) {
    }
    const goods = {
      id: result.value.id, // 商品id
      skuId: result.value.currentSelectedSkuId, // 商品 skuId
      name: result.value.name, //商品名称
      attrsText: result.value.currentSelectedSkuText, //商品规格属性文字
      picture: result.value.mainPictures[0], //商品图片
      price: result.value.oldPrice, //商品原价
      nowPrice: result.value.price, //商品现价
      selected: true, //是否选中
      stock: result.value.inventory, //商品库存
      count: count.value, //用户选择的商品数量
      isEffective: true, //如果商品选择了规格，该商品就一定是有效商品，因为能够选择的规格都是有库存的
    };

    store
      .dispatch("cart/addGoodsToCart", goods)
      .then(() => {
        MsgService({ type: "success", text: "商品已经成功被添加到购物车中" });
      })
      .catch((error) => {
        const msg = error.err.response.data.message;
        MsgService({ type: "success", text: msg });
      });
  };

  const count = ref(1);
  return { result, onSpecChange, count, addToCart };
}
