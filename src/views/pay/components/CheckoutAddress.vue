<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!finalAddress">
        您需要先添加收货地址才可提交订单。
      </div>
      <ul v-else>
        <li>
          <span>收<i />货<i />人：</span>{{ finalAddress.receiver }}
        </li>
        <li>
          <!-- 隐藏手机号中间四位 -->
          <span>联系方式</span
          >{{
            finalAddress.contact.replace(/(\d{3})(\d{4})(\d{4})/g, "$1****$3")
          }}
        </li>
        <li>
          <span>收货地址：</span>{{ finalAddress.fullLocation }}
          {{ finalAddress.address }}
        </li>
      </ul>
      <a href="javascript:" @click="modifyAddress">修改地址</a>
    </div>
    <div class="action">
      <CartButton class="btn" @click="onSwitchAddress">切换地址</CartButton>
      <CartButton class="btn" @click="onAddAddress">添加地址</CartButton>
    </div>

    <!-- 两个 Vue 实例，修改地址和添加地址对话框用-->
    <EditAddress ref="editAddressInstance"></EditAddress>
    <SwitchAddress
      ref="selectAddressInstance"
      @onAddressSwitched="onAddressSwitched"
    ></SwitchAddress>
  </div>
</template>

<script>
import SwitchAddress from "@/views/pay/components/SwitchAddress";
import EditAddress from "@/views/pay/components/EditAddress";
import useCheckoutAddress from "@/hooks/order/useCheckoutAddress";
export default {
  name: "CheckoutAddress",
  components: { SwitchAddress, EditAddress },
  setup() {
    const {
      selectAddressInstance,
      editAddressInstance,
      onSwitchAddress,
      getAddresses,
      onAddAddress,
    } = useCheckoutAddress();

    const {
      addresses,
      finalAddress,
      onAddressListChanged,
      onAddressSwitched,
      modifyAddress,
    } = getAddresses();

    return {
      selectAddressInstance,
      editAddressInstance,
      onSwitchAddress,
      getAddresses,
      onAddAddress,
      addresses,
      finalAddress,
      onAddressListChanged,
      onAddressSwitched,
      modifyAddress,
    };
  },
};
</script>

<style scoped lang="less">
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
