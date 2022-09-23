<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        href="javascript:"
        :class="{ active: sortParams.sortField === '' }"
        @click="updateSortParams({ sortField: '', sortMethod: 'desc' })"
        >默认排序</a
      >
      <a
        href="javascript:"
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="updateSortParams({ sortField: 'publishTime' })"
        >最新商品</a
      >
      <a
        href="javascript:"
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="updateSortParams({ sortField: 'orderNum' })"
        >最高人气</a
      >
      <a
        href="javascript:"
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="updateSortParams({ sortField: 'evaluateNum' })"
        >评论最多</a
      >
      <a
        href="javascript:"
        @click="
          updateSortParams({
            sortField: 'price',
            sortMethod: sortParams.sortMethod === 'desc' ? 'asc' : 'desc',
          })
        "
      >
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        ></i>
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
        ></i>
      </a>
    </div>

    <div class="check">
      <CheckBox
        v-model="sortParams.inventory"
        @update:modelValue="updateSortParams({ inventory: $event })"
        >仅显示有货</CheckBox
      >
      <CheckBox
        v-model="sortParams.onlyDiscount"
        @update:modelValue="updateSortParams({ onlyDiscount: $event })"
      ></CheckBox>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SubSort",
  components: {},

  setup({ emit }) {
    const sortParams = ref({
      sortField: "",
      sortMethod: "desc",
      inventory: false,
      onlyDiscount: false,
    });

    const updateSortParams = (target) => {
      sortParams.value = { ...sortParams.value, ...target };
      emit("onSortParamsChanged", sortParams.value);
    };
    return { sortParams, updateSortParams };
  },
};
</script>

<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
