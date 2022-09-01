import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { ref } from "vue";
import { getCommentInfo, getCommentList } from "@/api/goods";

export default function useGoodsComment() {
  const route = useRoute();
  const commentInfo = ref(null);
  const currentTagTitle = ref("全部评论");
  const commentList = ref(null);

  const getGoodsCommentInfo = (id) => {
    getCommentInfo(id).then((res) => {
      res.result.tags.unshift(
        {
          title: "全部评论",
          tagCount: res.result.evaluateCount,
        },
        {
          title: "有图",
          tagCount: res.result.hasPictureCount,
        }
      );
      commentInfo.value = res.result;
    });
  };

  getGoodsCommentInfo(route.params.id);

  const getGoodsCommentList = (id) => {
    getCommentList(id).then((res) => {
      commentList.value = res.result;
    });
  };

  getGoodsCommentList(route.params.id);

  onBeforeRouteUpdate((to) => {
    getGoodsCommentInfo(to.params.id);
    getGoodsCommentList(route.params.id);
  });

  const formatNickname = (nickname) => {
    return nickname[0] + "****" + nickname.substr(-1);
  };


  return {
    commentInfo,commentList
  }
}
