<template>
  <div class="home-banner">
    <Carousel v-if="sliders" :sliders="sliders" autoPlay/>
  </div>
</template>

<script>
import Carousel from "@/components/library/Carousel";
import { ref } from "vue";
import { getBanner } from "@/api/home";
export default {
  name: "HomeBanner",
  components: { Carousel },
  setup() {
    const sliders = ref([]);
    getBanner().then((data) => {
      sliders.value = data.result;
    });
    return { sliders };
  },
};
</script>

<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
.carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }

  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>
