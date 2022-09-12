import { computed, ref } from "vue";
import { getAddress } from "@/api/order";
import MsgService from "@/components/library/MsgService";

export default function useCheckoutAddress() {
  // 存储编辑收货地址组件实例的对象
  const editAddressInstance = ref(null);
  const selectAddressInstance = ref(null);

  const onAddAddress = () => {
    editAddressInstance.value.visible = true;

    // 初始收货地址参数
    editAddressInstance.value.address = {
      provinceCode: "",
      cityCode: "",
      countyCode: "",
      receiver: "",
      contact: "",
      address: "",
      postalCode: "",
      addressTag: "",
      isDefault: false,
    };
    editAddressInstance.value.location = "";
  };

  const getAddresses = () => {
    // 收货地址列表
    const addressToAdd = ref(null);
    const getData = (callback) => {
      getAddress().then((data) => {
        addressToAdd.value = data.result;
        callback && callback(data.result);
      });
    };
    getData();

    const userSelectedAddress = ref();
    const finalAddress = computed(() => {
      let result = null;
      if (userSelectedAddress.value) {
        result = userSelectedAddress.value;
      } else {
        if (addressToAdd.value && addressToAdd.value.length > 0) {
          result = addressToAdd.value.find((item) => item.isDefault === 0);
          if (!result) {
            result = addressToAdd.value[0];
          }
        }
      }
      return result;
    });

    const onAddressListChanged = (id) => {
      getData((list) => {
        userSelectedAddress.value = list.find((item) => item.id === id);
      });
    };

    const modifyAddress = () => {
      if (!finalAddress.value) {
        return MsgService({ type: "warn", text: "请先添加一个地址" });
      }
      const { fullLocation, isDefault, ...rest } = finalAddress.value;
      editAddressInstance.value.location = fullLocation;
      editAddressInstance.value.address = {
        ...rest,
        isDefault: isDefault === 0,
      };
      editAddressInstance.value.visible = true;
    };

    const onAddressSwitched = (address) => {
      userSelectedAddress.value = address;
    };

    return {
      addressToAdd,
      finalAddress,
      onAddressSwitched,
      onAddressListChanged,
      modifyAddress,
    };
  };

  const onSwitchAddress = () => {
    selectAddressInstance.value.visible = true;
  };

  return {
    editAddressInstance,
    selectAddressInstance,
    onAddAddress,
    onSwitchAddress,
    getAddresses,
  };
}
