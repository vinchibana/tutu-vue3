<template>
  <MemberLayout>
    <div class="member-home">
      <MemberOverview />
      <MemberPanel title="我的足迹">
        <GoodsItem
          v-for="goods in collection?.items"
          :key="goods.id"
          :goods="goods"
        ></GoodsItem>
      </MemberPanel>
      <GoodsRelevant/>
    </div>
  </MemberLayout>
</template>

<script>
import GoodsRelevant from "@/views/goods/components/GoodsRelevant";
import GoodsItem from "@/views/category/components/GoodsItem";
import MemberPanel from "@/views/member/home/components/MemberPanel";
import MemberOverview from "@/views/member/home/components/MemberOverview";
import MemberLayout from "@/components/MemberLayout";
import { ref } from "vue";
import { getCollection } from "@/api/member";
export default {
  name: "Member",
  components: { GoodsRelevant,MemberLayout, MemberOverview, MemberPanel, GoodsItem },
  setup() {
    const collection = ref(null);
    getCollection({ pageSize: 4 }).then((data) => {
      collection.value = data.result;
    });

    return { collection };
  },
};
</script>

<style scoped lang="less">
.member-home {
  :deep(.xtx-carousel) .carousel-btn.prev {
    left: 5px;
  }
  :deep(.xtx-carousel) .carousel-btn.next {
    right: 5px;
  }
}
</style>
