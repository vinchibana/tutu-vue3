import request from "@/utils/request";

export function getOrderList({ page, pageSize, orderState }) {
  return request(
    "/member/order",
    "get",
    { page, pageSize, orderState },
    { withToken: true }
  );
}

export function cancelOrder({ id, cancelReason }) {
  return request(
    `/member/order/${id}/cancel`,
    "put",
    { cancelReason },
    { withToken: true }
  );
}

export function deleteOrder(ids) {
  return request("/member/order", "delete", { ids }, { withToken: true });
}

export function getLogisticsByOrderId(id) {
  return request(
    `/member/order/${id}/logistics`,
    "get",
    {},
    { withToken: true }
  );
}

export function confirmReceiptGoods(id) {
  return request(`/member/order/${id}/receipt`, "put", {}, { withToken: true });
}

export function getOrderDetail(id) {
  return request(`/member/order/${id}`, "get", {}, { withToken: true });
}

export function getCollection({ collectType = 1, page = 1, pageSize = 10 }) {
  return request(
    "/member/collect",
    "get",
    { collectType, page, pageSize },
    { withToken: true }
  );
}
