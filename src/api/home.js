import request from "@/utils/request";

export const getBrandList = (limit) => {
  return request("/home/brand", "get", { limit });
};

export const getBanner = () => {
  return request('/home/banner','get')
}
