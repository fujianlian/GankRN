import {getFetch, postFetch} from "./http_wan_android_extension";

const base_url = "https://www.wanandroid.com/";

// 生成可用url
const service_url = (path) => {
    return base_url + path;
};

/**
* 首页banner
*/
export const getBanner = () => {
    return getFetch(service_url('banner/json'));
};

/**
 * 最新项目列表
 * @param page 页码
 */
export const getNewProject = (page) => {
    return getFetch(service_url(`article/listproject/${page}/json`));
};