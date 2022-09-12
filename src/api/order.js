import request from "@/utils/request";

export function createOrder() {
  return request("/member/order/pre", "get", {}, { withToken: true });
}

export function addAddress(address) {
  return request("/member/address", "post", address, { withToken: true });
}

export function getAddress(address) {
  return request("/member/address", "get", address, { withToken: true });
}

export function updateAddress(address) {
  return request(`/member/address/${address.id}`, "put", address, {
    withToken: true,
  });
}

export function submitOrder(order) {
  return request("/member/order", "post", order, { withToken: true });
}

export function getOrderInfoById(id) {
  return request(`/member/order/${id}`, "get", {}, { withToken: true });
}

export function createOrderById(id) {
  return request(
    `/member/order/repurchase/${id}`,
    "get",
    {},
    { withToken: true }
  );
}
