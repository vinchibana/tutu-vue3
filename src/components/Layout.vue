<template>
  <TopNav />
  <Header />
  <FixedHeader />
  <slot />
  <Footer />
</template>

<script>
import TopNav from "@/components/TopNav";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FixedHeader from "@/components/FixedHeader";
import { useStore } from "vuex";

export default {
  name: "Layout",
  components: { Header, TopNav, Footer, FixedHeader },
  setup() {
    const store = useStore();
    // 请求获取头部品类数据
    store.dispatch("category/getCategoryList");
  },
};
</script>

<style scoped></style>
