import request from "@/utils/request";

export function updateGoodsById({ skuId, id }) {
  return request(`/goods/stock/${skuId}`, "get", { id });
}

export function getSkuInfoById(skuId) {
  return request(`/goods/sku/${skuId}`, "get");
}

export function mergeCart(cart) {
  return request("/member/cart/merge", "post", cart, { withToken: true });
}

export function getCartList() {
  return request("/member/cart", "get", {}, { withToken: true });
}

export function addGoodsToCart({ skuId, count }) {
  return request("/member/cart", "post", { skuId, count }, { withToken: true });
}

export function deleteCartGoodsByIds(ids) {
  return request("/member/cart", "delete", { ids }, { withToken: true });
}

export function updateCartGoodsById({ skuId, selected, count }) {
  return request(
    `/member/cart/${skuId}`,
    "put",
    { selected, count },
    { withToken: true }
  );
}

export function selectAll({ selected, ids }) {
  return request(
    "/member/cart/selected",
    "put",
    { selected, ids },
    { withToken: true }
  );
}
