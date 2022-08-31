import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getTopCategoryById } from "@/api/category";

export default function useTopCategory() {
  const route = useRoute();
  let result = ref();

  const getData = (id) => {
    getTopCategoryById(id).then((res) => {
      result.value = res.result;
    });
  };
  getData(route.params.id);

  onBeforeRouteUpdate((to) => {
    getData(to.params.id)
  })

  return result
}
