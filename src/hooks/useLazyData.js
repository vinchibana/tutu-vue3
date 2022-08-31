import { useIntersectionObserver } from "@vueuse/core";
import { ref } from "vue";

export const useLazyData = (apiFn) => {
  // 创建对象元素
  const target = ref(null);
  // 存储数据
  const result = ref([]);
  // 监听元素进入可视区
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 停止监听懒加载
        stop();
        // 调用API 获取数据
        apiFn().then((data) => {
          result.value = data.result;
        });
      }
    },
    { threshold: 0 }
  );
  return { target, result };
};
