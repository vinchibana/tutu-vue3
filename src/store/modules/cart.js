import {
  addGoodsToCart,
  deleteCartGoodsByIds,
  getCartList,
  updateCartGoodsById,
  updateGoodsById,
  selectAll,
  mergeCart,
} from "@/api/cart";

export default {
  namespaced: true,
  state() {
    return {
      list: [],
    };
  },

  mutations: {
    addGoodsToCart(state, goods) {
      // 在已有购物车内寻找匹配新添加商品的已有商品
      const index = state.list.findIndex((item) => item.skuId === goods.skuId);
      if (index > -1) {
        state.list[index].count += goods.count;
        if (index === 0) return;
        state.list.unshift(state.list.splice(index, 1)[0]);
      } else {
        state.list.unshift(goods);
      }
    },

    setCart(state, payload) {
      state.list = payload;
    },

    deleteCartGoodsById(state, skuId) {
      const index = state.list.findIndex((item) => item.skuId === skuId);
      if (index > -1) {
        state.list = [
          ...state.list.slice(0, index),
          ...state.list.slice(index + 1),
        ];
      }
    },

    updateGoodsById(state, payload) {
      state.list.some((item) => {
        if (item.skuId === payload.skuId) {
          item = Object.assign(item, payload);
          return true;
        }
      });
    },
  },

  actions: {
    /**
     * 添加商品到购物车中去
     * @param rootState 顶级state
     * @param commit
     * @param dispatch
     * @param goods
     * @returns {Promise<void>}
     */
    async addGoodsToCart({ rootState, commit, dispatch }, goods) {
      if (rootState.user.profile.token) {
        await addGoodsToCart({
          skuId: goods.skuId,
          count: goods.count,
        });
        dispatch("updateCartList");
      } else {
        commit("addGoodsToCart", goods);
      }
    },

    async updateCartList({ rootState, commit }) {
      if (rootState.user.profile.token) {
        const data = await getCartList();
        commit("setCart", data.result);
      } else {
      }
    },

    // 已登录：删除后发送请求更新购物车；未登录：仅删除
    async deleteCartGoodsById({ rootState, commit, dispatch }, skuId) {
      if (rootState.user.profile.token) {
        await deleteCartGoodsByIds(skuId);
        dispatch("updateCartList");
      } else {
        commit("deleteCartGoodsById", skuId);
      }
    },

    async updateGoodsById({ rootState, commit, dispatch }) {
      if (rootState.user.profile.token) {
        dispatch("updateCartList");
      } else {
        state.list.forEach(({ skuId, id }, index) => {
          updateGoodsById({ skuId, id }).then((data) => {
            data.result.skuId = state.list[index].skuId;
            commit("updateGoodsById", data.result);
          });
        });
      }
    },

    async updateCartGoodsById({ rootState, commit, dispatch }, goods) {
      if (rootState.user.profile.token) {
        await updateCartGoodsById(goods);
        dispatch("updateCartList");
      } else {
        commit("updateGoodsById", goods);
      }
    },

    // 更新购物车中的所有商品的按钮状态
    async selectAll({ rootState, getters, commit, dispatch }, isAll) {
      if (rootState.user.profile.token) {
        const ids = getters.effectiveGoodsList.map((item) => item.skuId);
        await selectAll({ ids, selected: isAll });
        dispatch("updateCartList");
      } else {
        getters.effectiveGoodsList.forEach((item) => {
          commit("updateGoodsById", {
            skuId: item.skuId,
            selected: isAll,
          });
        });
      }
    },

    async deleteCartGoodsByUserSelectedOrInvalid(
      { rootState, getters, commit, dispatch },
      flag
    ) {
      if (rootState.user.profile.token) {
        const ids = getters[flag].map((item) => item.skuId);
        await deleteCartGoodsByIds(ids);
        dispatch("updateCartList");
      } else {
        getters[flag].forEach((item) => {
          commit("deleteCartGoodsById", item.skuId);
        });
      }
    },

    // 更新商品规格信息
    async updateGoodsOfCartBySkuChanged(
      { rootState, state, commit, dispatch },
      { oldSkuId, newSku }
    ) {
      if (rootState.user.profile.token) {
        // 登录（因未提供对应接口，采取先删除、再添加的方式达到修改的目的）
        // 查找原商品
        const oldGoods = state.list.find((item) => item.skuId === oldSkuId);
        // 删除原商品
        await deleteCartGoodsByIds([oldSkuId]);
        // 添加新商品（即修改过规格后的原商品）
        await addGoodsToCart({
          skuId: newSku.skuId,
          count: oldGoods.count,
        });
        // 更新购物车列表
        dispatch("updateCartList");
      } else {
        // 未登录
        const oldGoods = state.list.find((item) => item.skuId === oldSkuId);
        const newGoods = {
          ...oldGoods,
          skuId: newSku.skuId,
          stock: newSku.inventory,
          oldPrice: newSku.oldPrice,
          nowPrice: newSku.price,
          attrsText: newSku.specsText,
        };
        // 删除原商品
        commit("deleteGoodsOfCartBySkuId", oldSkuId);
        // 插入新商品
        commit("addGoodsToCart", newGoods);
      }
    },
    // 合并购物车
    async mergeCart({ state, commit }) {
      if (state.list.length === 0) return;
      // 待合并的购物车列表
      const carts = state.list.map((item) => ({
        skuId: item.skuId,
        selected: item.selected,
        count: item.count,
      }));
      try {
        // 发送合并购物车请求
        await mergeCart(carts);
        // 清空购物车
        commit("setCart", []);
      } catch (error) {
        throw new Error(error);
      }
    },
    // 更新购物车商品
  },

  getters: {
    effectiveGoodsList(state) {
      return state.list.filter((item) => item.isEffective && item.stock > 0);
    },

    // count/price 作为累加器
    effectiveGoodsCount(state, getters) {
      return getters.effectiveGoodsList.reduce(
        (count, item) => count + item.count,
        0
      );
    },

    effectiveGoodsPrice(state, getters) {
      return getters.effectiveGoodsList.reduce(
        (price, item) => price + Number(item.nowPrice)
      );
    },

    invalidGoodsList(state) {
      return state.list.filter((item) => !item.isEffective || item.stock === 0);
    },

    userSelectedGoodsList(state, getters) {
      return getters.effectiveGoodsList.filter((item) => item.selected);
    },

    userSelectedGoodsCount(state, getters) {
      return getters.userSelectedGoodsList.reduce(
        (count, item) => item.count + count,
        0
      );
    },

    userSelectedGoodsPrice(state, getters) {
      return getters.userSelectedGoodsList
        .reduce((price, item) => price + Number(item.nowPrice) * item.count, 0)
        .toFixed(2);
    },

    selectAllBtnStatus(state, getters) {
      return (
        getters.effectiveGoodsCount > 0 &&
        getters.userSelectedGoodsCount === getters.effectiveGoodsCount
      );
    },
  },
};
