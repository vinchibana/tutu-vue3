<!-- 修改/添加 地址按钮共用组件 弹窗 -->
<template>
  <Dialog
    v-model:visible="visible"
    :title="`${address?.id ? '修改' : '添加'}收货地址`"
  >
    <!-- 地址输入区域 -->
    <template v-slot:default>
      <div class="address-edit">
        <div class="xtx-form">
          <div class="xtx-form-item">
            <div class="label">收货人：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入收货人"
                v-model="address.receiver"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">手机号：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入手机号"
                v-model="address.contact"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地区：</div>
            <div class="field">
              <CityService
                :location="location"
                @onCityChanged="onCityChanged"
                placeholder="请选择所在地区"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">详细地址：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入详细地址"
                v-model="address.address"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">邮政编码：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入邮政编码"
                v-model="address.postalCode"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">地址标签：</div>
            <div class="field">
              <input
                class="input"
                placeholder="请输入地址标签，逗号分隔"
                v-model="address.addressTags"
              />
            </div>
          </div>
          <div class="xtx-form-item">
            <div class="label">是否设置为默认地址：</div>
            <div class="field">
              <input
                type="checkbox"
                class="checkbox"
                v-model="address.isDefault"
              />
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- 按钮区域 -->
    <template v-slot:footer>
      <CartButton
        @click="visible = false"
        type="grey"
        style="margin-right: 20px"
        >取消</CartButton
      >
      <CartButton @click="onConfirmAddress" type="primary">确认</CartButton>
    </template>
  </Dialog>
</template>

<script>
import { ref } from "vue";
import { addAddress, updateAddress } from "@/api/order";
import MsgService from "@/components/library/MsgService";

export default {
  name: "EditAddress",
  setup(props, { emit }) {
    const visible = ref(false);
    const location = ref("");
    // 待添加或修改的 address 表单项对象
    const address = ref({
      provinceCode: "",
      cityCode: "666",
      countyCode: "",
      receiver: "", // 收货人
      contact: "", // 手机号
      address: "", // 详细地址
      postalCode: "", // 邮政编码
      addressTags: "", // 地址标签
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
      console.log(target);
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
      onConfirmAddress,
      onCityChanged, // CityService 组件
    };
  },
};
</script>

<style scoped lang="less">
.xtx-dialog {
  :deep(.wrapper) {
    width: 780px;
    .body {
      font-size: 14px;
    }
  }
  .xtx-city {
    width: 320px;
    :deep(.select) {
      height: 50px;
      line-height: 48px;
      display: flex;
      padding: 0 10px;
      justify-content: space-between;
      .placeholder {
        color: #ccc;
      }
      i {
        color: #ccc;
        font-size: 18px;
      }
      .value {
        font-size: 14px;
      }
    }
    :deep(.option) {
      top: 49px;
    }
  }
}
.xtx-form {
  padding: 0;
  .xtx-form-item {
    width: auto;
    &:last-child {
      padding-bottom: 0;
    }
  }
  input {
    outline: none;
    &::placeholder {
      color: #ccc;
    }
  }
}
</style>
