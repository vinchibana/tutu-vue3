<template>
  <Dialog title="更换收货地址" v-model:visible="visible">
    <template v-slot:default>
      <div class="address-switch">
        <!-- active 伪类 hover 时高亮-->
        <div
          class="text item"
          :class="{ active: item.id === activeAddressId }"
          v-for="item in list"
          :key="item.id"
          @click="onSwitchAddress(item)"
        >
          <ul>
            <li>
              <span>收<i />货<i />人：</span>{{ item.receiver }}
            </li>
            <li><span>联系方式：</span>{{ item.contact }}</li>
            <li>
              <span>收货地址：</span>{{ item.fullLocation + item.address }}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <CartButton
        @click="visible = false"
        type="primary"
        style="margin-right: 20px"
      >
        取消
      </CartButton>
    </template>
  </Dialog>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SwitchAddress",
  components: {},
  props: {
    // 通过 getAddress 获取到的 addresses
    list: {
      type: Array,
      default: () => [],
    },
    activeAddressId: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const onSwitchAddress = (address) => {
      // 通过自定义事件触发父组件方法，将参数 address 赋值给 userSelectedAddress
      emit("onAddressSwitched", address);
      visible.value = false;
    };

    return { visible, onSwitchAddress };
  },
};
</script>

<style scoped lang="less">
.address-switch {
  height: 478px;
  overflow-y: auto;
}
.xtx-dialog {
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>
