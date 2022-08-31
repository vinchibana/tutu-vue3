<template>
  <Layout>
    <div class="top-category">
      <div class="container">
        <BreadCrumb>
          <BreadItem path="/">首页</BreadItem>
          <BreadItem :id="category?.id" :path="`/category/${category?.id}`">{{
            category?.name
          }}</BreadItem>
        </BreadCrumb>
        <Carousel v-if="sliders" :sliders="sliders" style="height: 500px" />
        <SubCategoryList :subCategory="category.children" v-if="category" />
        <RecommendList />
      </div>
    </div>
  </Layout>
</template>

<script>
import RecommendList from "@/views/category/components/RecommendList";
import SubCategoryList from "@/views/category/components/SubCategoryList";
import Layout from "@/components/Layout";
import Carousel from "@/components/library/Carousel";
import BreadCrumb from "@/components/library/BreadCrumb";
import GoodsItem from "@/views/category/components/GoodsItem";
import useBanners from "@/hooks/useBanners";
import useBread from "@/hooks/category/useBread";

export default {
  name: "TopCategory",
  components: {
    BreadCrumb,
    Carousel,
    GoodsItem,
    Layout,
    SubCategoryList,
    RecommendList,
  },
  setup() {
    // banner
    return {
      sliders: useBanners(),
      category: useBread(),
    };
  },
};
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
