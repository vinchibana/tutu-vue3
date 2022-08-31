<template>
  <div class="goods-detail">
    <ul class="attrs">
      <li v-for="item in goodsDetail.details.properties" :key="item.name">
        <span class="dt">{{ item.name }}</span>
        <span class="dd"> {{ item.value }}</span>
      </li>
    </ul>

    <img
      :src="img"
      alt=""
      v-for="img in goodsDetail.details.pictures"
      :key="img"
    />
  </div>
</template>

<script>
import { inject } from "vue";

export default {
  name: "GoodsDetail",
  setup() {
    const goodsDetail = inject("goodsDetail");
    return { goodsDetail };
  },
};
</script>

<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
