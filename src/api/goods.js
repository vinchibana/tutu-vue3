import request from "@/utils/request";

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const getGoodsDetailById = (id) => {
  return request("/goods", "get", { id });
};

/**
 * 根据ID获取推荐商品
 * @param id 商品id（传入了商品id表示获取相关商品数据 没有id参数获取猜你喜欢）
 * @param limit 关联商品数量限制
 * @returns {*}
 */
export function getRelevantGoods(id, limit = 16) {
  return request("/goods/relevant", "get", { id, limit });
}
