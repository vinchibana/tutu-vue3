<template>
  <Layout>
    <div class="xtx-goods-page">
      <div class="container" v-if="goodsDetail">
        <BreadCrumb>
          <BreadItem path="/">首页</BreadItem>
          <BreadItem :path="`/category/${goodsDetail?.categories[1].id}`">{{
            goodsDetail?.categories[1].name
          }}</BreadItem>
          <BreadItem :path="`/category/sub/${goodsDetail?.categories[0].id}`">{{
            goodsDetail?.categories[0].name
          }}</BreadItem>
          <BreadItem :id="goodsDetail?.id">{{ goodsDetail?.name }} </BreadItem>
        </BreadCrumb>

        <div class="goods-info">
          <div class="media">
            <GoodsImages :images="goodsDetail.mainPictures" />
            <GoodsSales />
          </div>

          <div class="spec">
            <GoodsInfo :goods="goodsDetail" />
            <GoodsSku
              :specs="goodsDetail.specs"
              :skus="goodsDetail.skus"
              @onSpecChange="onSpecChange"
            />
            <NumberBox
              label="数量"
              :max="goodsDetail.inventory"
              v-model="count"
            />
            <CartButton
              type="primary"
              :style="{ marginTop: '20px' }"
              @click="addToCart"
              >加入购物车</CartButton
            >
          </div>
        </div>

        <!-- 根据当前商品 id 获取相关推荐 -->
        <GoodsRelevant :goodsId="goodsDetail.id" />
        <!-- 商品详情 -->
        <div class="goods-footer">
          <div class="goods-article">
            <GoodsTab />
            <div class="goods-warn">
              <GoodsWarn />
            </div>
          </div>

          <!-- 24热榜 -->
          <div class="goods-aside">
            <GoodsHot :type="1" />
            <GoodsHot :type="2" />
            <GoodsHot :type="3" />
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import GoodsImages from "@/views/goods/components/GoodsImages";
import useGoods from "@/hooks/goods/useGoods";
import { provide } from "vue";
import BreadItem from "@/components/library/BreadItem";
import GoodsSales from "@/views/goods/components/GoodsSales";
import GoodsInfo from "@/views/goods/components/GoodsInfo";
import GoodsSku from "@/views/goods/components/GoodsSku";
import CartButton from "@/components/library/CartButton";
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import GoodsTab from "@/views/goods/components/GoodsTab";
import GoodsWarn from "@/views/goods/components/GoodsWarn";
import GoodsHot from "@/views/goods/components/GoodsHot";

export default {
  name: "GoodsDetail",
  components: {
    CartButton,
    BreadItem,
    GoodsImages,
    Layout,
    GoodsSales,
    GoodsInfo,
    GoodsSku,
    GoodsRelevant,
    GoodsTab,
    GoodsWarn,
    GoodsHot
  },
  setup() {
    const { result: goodsDetail, onSpecChange, count, addToCart } = useGoods();
    provide("goodsDetail", goodsDetail);
    return { goodsDetail, onSpecChange, count, addToCart };
  },
};
</script>

<style scoped lang="less">
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
</style>
