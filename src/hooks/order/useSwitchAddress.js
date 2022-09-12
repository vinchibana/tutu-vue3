import { ref } from "vue";

export default function useSwitchAddress(emit) {
  const visible = ref(false);
  const onSwitchAddress = (address) => {
    emit("onAddressSwitched", address);
    visible.value = false;
  };

  return { visible, onSwitchAddress };
}
