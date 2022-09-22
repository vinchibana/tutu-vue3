<template>
  <div class="sub-filter" v-if="filters && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="item in filters.brands"
          :key="item.id"
          :class="{ active: filters.selectedBrandId === item.id }"
          @click="
            filters.selectedBrandId = item.id;
            updateSelectedFilters();
          "
          >{{ item.name }}</a
        >
      </div>
      <div class="head">规格：</div>
    </div>
    <div class="item" v-for="item in filters.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a
          href="javascript:"
          v-for="property in item.properties"
          :key="property.id"
          :class="{ active: item.selectedFilterName === property.name }"
          @click="
            item.selectedFilterName = property.name;
            updateSelectedFilters();
          "
          >{{ property.name }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import useSubFilter from "@/hooks/category/useSubFilter";

export default {
  name: "SubFilter",
  setup(props, { emit }) {
    const { filters, filterLoading, updateSelectedFilters } =
      useSubFilter(emit);
    return {
      filters,
      filterLoading,
      updateSelectedFilters,
    };
  },
};
</script>

<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}

.xtx-skeleton {
  padding: 10px 0;
}
</style>
