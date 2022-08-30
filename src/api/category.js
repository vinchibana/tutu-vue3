import request from "@/utils/request";

export const getAllCategory = () => {
  return request("/home/category/head", "get");
};
