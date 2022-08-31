import request from "@/utils/request";

export const getBrandList = (limit) => {
  return request("/home/brand", "get", { limit });
};

export const getBanner = () => {
  return request("/home/banner", "get");
};

export const getNew = () => {
  return request("/home/new", "get");
};

export const getHot = () => {
  return request("/home/hot", "get");
};

export const getSpecial = () => {
  return request("/home/special", "get");
};

export const getGoods = () => {
  return request("/home/goods", "get");
};
