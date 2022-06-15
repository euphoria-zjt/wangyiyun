//搜索模块
// 热搜关键词
import request from "@/utils/request";
export const hostSreach = (params) =>
  request({
    url: "/search/hot",
    params,
  });
// 搜索结果
export const searchResults = (params) =>
  request({
    url: "/cloudsearch",
    params,
  });
