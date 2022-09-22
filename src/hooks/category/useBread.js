// 计算商品分类页面面包屑路径值
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default function useBread(type = "top") {
  const store = useStore();
  const route = useRoute();

  if (type === "top") {
    return computed(() => {
      return store.state.category.categoryList.find(
        (item) => item.id === route.params.id
      );
    });
  } else if (type === "sub") {
    return computed(() => {
      let topCategory = null;
      let subCategory = null;
      store.state.category.categoryList.forEach((top) => {
        top.children?.forEach((sub) => {
          if (sub.id === route.params.id) {
            topCategory = top;
            subCategory = sub;
          }
        });
      });
      return { topCategory, subCategory };
    });
  }
}
