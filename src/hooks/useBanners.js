import { ref } from "vue";
import { getBanner } from "@/api/home";

export default function useBanners() {
  let sliders = ref([]);
  getBanner().then((data) => {
    sliders.value = data.result;
  });
  return sliders;
}
