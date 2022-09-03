/* 封装倒计时控制 */
import { useIntervalFn } from "@vueuse/core";
import { onUnmounted, ref } from "vue";
export default function countdown() {
  const count = ref(0);
  const { pause, resume, isActive } = useIntervalFn(
    () => {
      if (count.value <= 0) {
        pause();
      } else {
        count.value--;
      }
    },
    1000,
    {
      immediate: false,
    }
  );

  const start = (value) => {
    if (!isActive.value) {
      count.value = value;
      resume();
    }
  };

  onUnmounted(pause);
  return { count, start, isActive };
}
