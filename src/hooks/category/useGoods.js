import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref, watch } from "vue";
import { getGoodsReq } from "@/api/category";

// 筛选子分类下的商品用于展示
export default function useGoods() {
  const route = useRoute();
  const result = ref(null);
  const loading = ref(false);
  const finished = ref(false);

  const reqParams = ref({
    categoryId: route.params.id,
    page: 0,
    pageSize: 5,
  });

  const getData = () => {
    loading.value = true;
    getGoodsReq(reqParams.value).then((res) => {
      if (reqParams.value.page === 1) {
        result.value = res.result;
        finished.value = false;
      } else {
        result.value = {
          ...result.value,
          items: [...result.value.items, ...res.result.items],
        };
      }
      loading.value = false;

      if (!res.result.pages || reqParams.value.page === res.result.pages) {
        finished.value = true;
      }
    });
  };

  watch(() => reqParams.value, getData);

  const onFilterSortChanged = (target) => {
    reqParams.value = { ...reqParams.value, ...target, page: 1 };
  };

  onBeforeRouteUpdate((to) => {
    reqParams.value = {
      ...reqParams.value,
      categoryId: to.params.id,
      page: 1,
    };
  });

  const loadMore = () => {
    reqParams.value = {
      ...reqParams.value,
      page: ++reqParams.value.page,
    };
  };
  return { result, loading, finished, getData, onFilterSortChanged, loadMore };
}
