import request from "@/utils/request";

export const getAllCategory = () => {
  return request("/home/category/head", "get");
};

export const getTopCategoryById = (id) => {
  return request("/category", "get", { id });
};

export const getSubCategoryFilterById = (id) => {
  return request("/category/sub/filter", "get",{id});
};

export const getGoodsReq = (params) => {
  return request("/category/goods", "post", params);
};
