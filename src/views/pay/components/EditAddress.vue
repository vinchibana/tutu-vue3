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
import useEditAddress from "@/hooks/order/useEditAddress";

export default {
  name: "EditAddress",
  setup(props, { emit }) {
    const { visible, location, address, onConfirmAddress, onCityChanged } =
      useEditAddress(emit);
    return {
      visible,
      location,
      address,
      onConfirmAddress,
      onCityChanged,
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
