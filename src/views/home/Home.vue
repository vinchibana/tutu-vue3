<template>
  <Layout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
    <HomeNew />
    <HomeHot />
    <HomeBrand />
    <HomeProducts />
    <HomeSpecial />
  </Layout>
</template>

<script>
import HomeBrand from "@/views/home/components/HomeBrand";
import HomeNew from "@/views/home/components/HomeNew";
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import Layout from "@/components/Layout";
import HomeHot from "@/views/home/components/HomeHot";
import HomeSpecial from "@/views/home/components/HomeSpecial";
import HomeProducts from "@/views/home/components/HomeProducts";
export default {
  name: "Home",
  components: {
    HomeBrand,
    HomeHot,
    Layout,
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeSpecial,
    HomeProducts,
  },
};
</script>

<style scoped></style>
