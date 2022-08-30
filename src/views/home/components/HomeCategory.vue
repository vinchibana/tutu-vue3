<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="current = item">
        <router-link :to="`/category/${item.id}`">{{ item.name }}</router-link>
        <template v-if="item.children?.length">
          <router-link
            v-for="subItem in item.children"
            :key="subItem.id"
            :to="`/category/sub/${subItem.id}`"
            >{{ subItem.name }}</router-link
          >
        </template>
      </li>
    </ul>

    <!-- 鼠标进入主品类后，当前 item 赋值给 current，得到 current 后显示弹出层-->
    <div class="layer" v-if="current">
      <h4>分类推荐 <small>根据您的购买记录或浏览记录推荐</small></h4>
      <ul v-if="current.goods">
        <li v-for="item in current.goods" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i></i>{{ item.price }}</p>
            </div>
          </router-link>
        </li>
      </ul>

      <ul v-if="current.brands">
        <li v-for="item in current.brands" :key="item.id">
          <router-link to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>{{ item.place }}
              </p>
              <p class="name ellipsis">{{ item.name }}</p>
              <p class="desc ellipsis-2">{{ item.nameEn }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getBrandList } from "@/api/home";

export default {
  name: "HomeCategory",
  setup() {
    const brand = reactive({
      id: "brand",
      name: "品牌",
      children: [{ id: "brand-children", name: "品牌推荐" }],
      brands: [],
    });
    const store = useStore();
    const menuList = computed(() => {
      const list = store.state.category.categoryList.map((item) => {
        return {
          id: item.id,
          name: item.name,
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        };
      });
      list.push(brand);
      return list;
    });

    getBrandList(6).then((data) => {
      brand.brands = data.result;
    });
    const current = ref(null);
    return { menuList, current };
  },
};
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover,
      &.active {
        background-color: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }

  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &.brand {
          height: 180px;
          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info {
              p {
                margin-top: 8px;
              }
              .place {
                color: #999;
              }
            }
          }
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
