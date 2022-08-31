<template>
  <div class="home-product" ref="target">
    <HomePanel v-for="item in list" :title="item.name" :key="item.id">
      <template v-slot:right>
        <div class="sub">
          <router-link
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/${sub.id}`"
            >{{ sub.name }}</router-link
          >
        </div>
        <CheckMore :path="`/category/${item.id}`" />
      </template>

      <template v-slot:default>
        <div class="box">
          <router-link to="/" class="cover">
            <img v-lazy="item.picture" :alt="item.name" />
            <strong class="label">
              <span>{{ item.name }}馆</span>
              <span>{{ item.saleInfo }}</span>
            </strong>
          </router-link>

          <ul class="goods-list">
            <li v-for="item in item.goods" :key="item.id">
              <HomeGoods :good="item" />
            </li>
          </ul>
        </div>
      </template>
    </HomePanel>
  </div>
</template>

<script>
import CheckMore from "@/components/library/CheckMore";
import HomePanel from "@/views/home/components/HomePanel";
import HomeGoods from "@/views/home/components/HomeGoods";
import { getGoods } from "@/api/home";
import { useLazyData } from "@/hooks/useLazyData";

export default {
  name: "HomeProducts",
  components: { HomePanel, HomeGoods, CheckMore },
  setup() {
    const { target, result: list } = useLazyData(getGoods);
    return { target, list };
  },
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
            /* 超出省略号 */
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
