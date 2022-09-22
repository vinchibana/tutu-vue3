import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getSubCategoryFilterById } from "@/api/category";

export default function useSubFilter(emit) {
  const route = useRoute();
  // 分类数据
  let filters = ref(null);
  const filterLoading = ref(false);

  // 存储用户选择的筛选条件
  const selectedFilters = {
    brandId: null,
    attrs: [],
  };

  const getData = (id) => {
    filterLoading.value = true;
    getSubCategoryFilterById(id).then((res) => {
      const data = res.result;
      data.brands.unshift({ id: null, name: "全部" });
      data.saleProperties.forEach((item) => {
        item.properties.unshift({ id: null, name: "全部" });
        item.selectedFilterName = "全部";
      });
      data.selectedBrandId = null;
      filters.value = res.result;
      filterLoading.value = false;
    });
  };

  getData(route.params.id);

  onBeforeRouteUpdate((to) => {
    getData(to.params.id);
  });

  // 更新筛选条件后
  const updateSelectedFilters = () => {
    selectedFilters.brandId = filters.value.selectedBrandId;
    selectedFilters.attrs = [];
    filters.value.saleProperties.forEach((item) => {
      if (item.selectedFilterName && item.selectedFilterName !== "全部") {
        console.log(item);
        selectedFilters.attrs.push({
          groupName: item.name,
          propertyName: item.selectedFilterName,
        });
      }
    });
    // 发送请求用，使用 useGoods 的 onFilterSortChanged 更新 reqParams 从而更新商品列表
    emit("onFilterChanged", selectedFilters);
  };

  return { filterLoading, filters, updateSelectedFilters };
}
