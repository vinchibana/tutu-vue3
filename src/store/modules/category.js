import { topCategory } from "@/api/constants";
import { getAllCategory } from "@/api/category";

export default {
  namespaced: true,
  state() {
    return {
      // 原始 topCategory 数组加 name 键值，用于无数据返回时显示
      categoryList: topCategory.map((item) => ({ name: item })),
    };
  },

  mutations: {
    setCategoryList(state, categoryList) {
      state.categoryList = categoryList;
    },

    showSubCategory(state, item) {
      const category = state.categoryList.find(
        (category) => category.id === item.id
      );
      category.open = true;
    },

    hideSubCategory(state, item) {
      const category = state.categoryList.find(
        (category) => category.id === item.id
      );
      category.open = false;
    },
  },

  actions: {
    async getCategoryList({ commit }) {
      const { result } = await getAllCategory();
      // 给一级分类添加控制二级分类显示隐藏的数据 open
      result.forEach((item) => {
        item.open = false;
      });
      // 提交 mutation 修改 categoryList 为获取到的结果
      commit("setCategoryList", result);
    },
  },
};
