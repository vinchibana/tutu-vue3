<template>
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱" ref="target">
      <template v-slot:right><CheckMore path="/" /> </template>
      <template v-slot:default>
        <Transition name="fade">
          <ul class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <router-link :to="`/goods/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name ellipsis">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </router-link>
            </li>
          </ul>
        </Transition>
      </template>
    </HomePanel>
</template>

<script>
import HomePanel from "@/views/home/components/HomePanel";
import CheckMore from "@/components/library/CheckMore";
import { getNew } from "@/api/home";
import { useLazyData } from "@/hooks/useLazyData";

export default {
  name: "HomeNew",
  components: { CheckMore, HomePanel },
  setup() {
    const { target, result: goods } = useLazyData(getNew);
    return { goods, target };
  },
};
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
