<template>
  <nav class="top-nav">
    <div class="container">
      <ul>
        <template v-if="profile.token">
          <li>
            <router-link to="/member/home">
              <i class="iconfont icon-user">{{ profile.account }}</i>
            </router-link>
          </li>
          <li><router-link to="/login">退出登录</router-link></li>
        </template>
        <tempalte v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li><router-link to="/login">免费注册</router-link></li>
        </tempalte>

        <li><router-link to="/login">我的订单</router-link></li>
        <li><router-link to="/login">会员中心</router-link></li>
        <li><router-link to="/login">帮助中心</router-link></li>
        <li><router-link to="/login">关于我们</router-link></li>
        <li>
          <a href="javascript:"><i class="iconfont icon-phone"></i></a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  name: "top-nav",
  setup() {
    const store = useStore();
    const profile = computed(() => {
      return store.state.user.profile;
    });
    return { profile };
  },
};
</script>

<style scoped lang="less">
.top-nav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;
        i {
          font-size: 14px;
          margin-right: 2px;
        }
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
