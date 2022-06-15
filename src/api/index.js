// api文件夹下 各个请求模块js 都统一来到index.js 导出
import { recommendMusic } from "./Home";
export const recommendMusicAPI = recommendMusic; //请求推荐歌单的方法导出

import { newMusic } from "./Home";
import { getSongById, getLyricById } from "./Play";
import { hostSreach, searchResults } from "./Search";
export const newMusicAPI = newMusic; //首页的最新音乐
export const hostSreachAPI = hostSreach; //热搜关键词
export const searchResultsAPI = searchResults; //搜索结果
export const getSongByIdAPI = getSongById;//歌曲播放地址
export const getLyricByIdAPI = getLyricById;//歌词数据
