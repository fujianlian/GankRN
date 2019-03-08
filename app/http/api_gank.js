import {getFetch, postFetch} from "./http_extension";

const base_url = "http://gank.io/api/";

// 生成可用url
const service_url = (path) => {
    return base_url + path;
};

// 默认每页数据大小
const pageSize = 15;

/**
 * 获取分类列表数据
 * @param type {福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all}
 * @param page 第几页
 * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
 */
export const getCategoryData = (type, page) => {
    return getFetch(service_url(`data/${type}/${pageSize}/${page}`));
};

/**
 * 获取分类列表数据
 * @param type {福利 | Android | iOS | 休息视频 | 拓展资源 | 前端 | all}
 * @param page 第几页
 * @returns {*|Promise<*>|PromiseLike<T | never>|Promise<T | never>}
 */
export const getToday = () => {
    return getFetch(service_url('today'));
};

/**
 * 每日数据
 * @param date
 * @returns {*}
 */
export const getDailyInfo = (date) => {
    return getFetch(service_url(`day/${date}`));
};

/**
 * 获取历史干货
 * @returns {*}
 */
export const getHistory = (page) => {
    return getFetch(service_url(`history/content/${pageSize}/${page}`));
};

/**
 * 发布干货
 * @param map 发布参数
 * @returns {*}
 */
export const add2Gank = (map) => {
    return postFetch(service_url('add2gank'), map);
};