<template>
  <Layout>
    <div class="container">
      <MemberSidebar />
      <article class="article">
        <slot />
      </article>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";
import MemberSidebar from "@/components/MemberSidebar";
export default {
  name: "MemberLayout",
  components: { MemberSidebar, Layout },
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
    position: relative;
  }
}
</style>
