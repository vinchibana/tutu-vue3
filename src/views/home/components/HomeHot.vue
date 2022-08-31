<template>
  <Transition name="fade">
    <HomePanel title="人气推荐" sub-title="人气爆款 不容错过" ref="target">
      <ul ref="panel" class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </router-link>
        </li>
      </ul>
    </HomePanel>
  </Transition>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import { getHot } from "@/api/home";
import { useLazyData } from "@/hooks/useLazyData";

export default {
  name: "HomeHot",
  components: { HomePanel },
  setup() {
    const { target, result: goods } = useLazyData(getHot);
    return { goods, target };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
