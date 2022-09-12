import { ref } from "vue";
import { addAddress, updateAddress } from "@/api/order";
import MsgService from "@/components/library/MsgService";

export default function useEditAddress(emit) {
  const visible = ref(false);
  const location = ref("");
  const address = ref({
    provinceCode: "",
    cityCode: "",
    countyCode: "",
    receiver: "",
    contact: "",
    address: "",
    postalCode: "",
    addressTags: "",
    isDefault: false,
  });

  const onCityChanged = (city) => {
    location.value = city.location;
    address.value.provinceCode = city.provinceCode;
    address.value.cityCode = city.cityCode;
    address.value.countyCode = city.countyCode;
  };

  const onConfirmAddress = async () => {
    const target = {
      ...address.value,
      isDefault: address.value.isDefault ? 0 : 1,
    };
    if (target.id) {
      try {
        const data = await updateAddress(target);
        visible.value = false;
        MsgService({ type: "success", text: "修改成功" });
        emit("onAddressChanged", data.result.id);
      } catch (error) {
        const msg = error.err.response.data.message;
        MsgService({ type: "error", text: `收货地址修改失败 ${msg}` });
      }
    } else {
      try {
        const data = await addAddress(target);
        visible.value = false;
        MsgService({ type: "success", text: "添加成功" });
        emit("onAddressChanged", data.result.id);
      } catch (error) {
        const msg = error.err.response.data.message;
        MsgService({ type: "error", text: `收货地址添加失败 ${msg}` });
      }
    }
  };

  return {
    visible,
    location,
    address,
    onCityChanged,
    onConfirmAddress,
  };
}
