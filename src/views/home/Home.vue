<template>
  <Layout>
    <div class="container">
      <HomeCategory />
      <HomeBanner />
    </div>
  </Layout>
</template>

<script>
import HomeCategory from "@/views/home/components/HomeCategory";
import HomeBanner from "@/views/home/components/HomeBanner";
import Layout from "@/components/Layout";
export default {
  name: "Home",
  components: { Layout, HomeCategory, HomeBanner },
};
</script>

<style scoped></style>
