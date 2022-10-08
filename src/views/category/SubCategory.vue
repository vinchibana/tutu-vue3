<template>
  <Layout>
    <div class="sub-category">
      <div class="container">
        <BreadCrumb>
          <BreadItem path="/">主页</BreadItem>
          <BreadItem :path="`/category/${category?.topCategory?.id}`">{{
            category?.topCategory?.name
          }}</BreadItem>
          <BreadItem :path="`/category/sub/${category?.subCategory?.id}`">{{
            category?.subCategory?.name
          }}</BreadItem>
        </BreadCrumb>

        <SubFilter @onFilterChanged="onFilterSortChanged" />
        <SubSort @onSortParamsChanged="onFilterSortChanged" />
        <div class="goods-list">
          <GoodsList v-if="goods" :goods="goods.items" />
          <InfiniteLoad
            :loading="loading"
            :finished="finished"
            @infinite="loadMore"
          />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import SubSort from "@/views/category/components/SubSort";
import SubFilter from "@/views/category/components/SubFilter";
import Layout from "@/components/Layout";
import useGoods from "@/hooks/category/useGoods";
import useBread from "@/hooks/category/useBread";
import GoodsList from "@/views/category/components/GoodsList";
export default {
  name: "SubCategory",
  components: { Layout, GoodsList, SubFilter, SubSort },
  setup() {
    const {
      result: goods,
      loading,
      finished,
      onFilterSortChanged,
      loadMore,
    } = useGoods();

    return {
      // useBread 返回对象，包含{ topCategory, subCategory };
      category: useBread("sub"),
      goods,
      loading,
      finished,
      onFilterSortChanged,
      loadMore,
    };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>
