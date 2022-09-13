import { computed, ref } from "vue";
import { getAddress } from "@/api/order";
import MsgService from "@/components/library/MsgService";

export default function useCheckoutAddress() {
  // 存储编辑收货地址组件实例的对象
  const editAddressInstance = ref(null);
  const selectAddressInstance = ref(null);

  // 点击 “添加收货地址”
  const onAddAddress = () => {
    // 打开添加地址对话框（Vue 实例）
    editAddressInstance.value.visible = true;
    // 初始化（清空）收货地址参数
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
    // addresses 存储发送请求获取到的收货地址列表
    const addresses = ref(null);
    const getData = (callback) => {
      getAddress().then((data) => {
        addresses.value = data.result;
        callback && callback(data.result);
      });
    };
    getData();

    // 存储用户新增的收货地址or切换的收货地址
    const userSelectedAddress = ref();
    // 计算最终能够渲染到页面中的收货地址
    const finalAddress = computed(() => {
      let result = null;
      // 如果用户添加了新的地址或者切换了地址
      if (userSelectedAddress.value) {
        // 优先渲染
        result = userSelectedAddress.value;
      } else {
        // 查看收货地址列表中是否存在收货地址
        if (addresses.value && addresses.value.length > 0) {
          // 获取默认收货地址
          result = addresses.value.find((item) => item.isDefault === 0);
          // 没有默认地址 就渲染第一个收货地址
          if (!result) {
            result = addresses.value[0];
          }
        }
      }
      return result;
    });

    // 切换地址，列表被修改后重新获取数据
    const onAddressListChanged = (id) => {
      getData((list) => {
        userSelectedAddress.value = list.find((item) => item.id === id);
      });
    };
    // 修改地址
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
      addresses,
      finalAddress,
      onAddressSwitched,
      onAddressListChanged,
      modifyAddress,
    };
  };

  // 打开切换地址对话框（Vue 实例）
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
