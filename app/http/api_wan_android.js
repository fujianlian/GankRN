import {getFetch, postFetch} from "./http_wan_android_extension";

const base_url = "https://www.wanandroid.com/";

// 生成可用url
const service_url = (path) => {
    return base_url + path;
};

const qq_music_url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';

/**
 * 获取qq音乐首页banner推荐
 */
export const getQQBanner = () => {
    return getFetch(qq_music_url);
};

/**
 * 首页banner
 */
export const getBanner = () => {
    return getFetch(service_url('banner/json'));
};

/**
 * 首页文章列表
 * @param page 第几页
 */
export const getHomeList = (page) => {
    return getFetch(service_url(`article/list/${page}/json`));
};

/**
 * 最新项目列表
 * @param page 页码
 */
export const getNewProject = (page) => {
    return getFetch(service_url(`article/listproject/${page}/json`));
};

export const login = (username, password) => {
    let map = new Map();
    map['username'] = username;
    map['password'] = password;
    return postFetch(service_url(`user/login`), map);
};

export const register = (username, password) => {
    let map = new Map();
    map['username'] = username;
    map['password'] = password;
    map['repassword'] = password;
    return postFetch(service_url(`user/register`), map);
};

export const collectList = (page, cookie) => {
    return getFetch(service_url(`lg/collect/list/${page}/json`), {}, cookie);
};

/**
 * 收藏站内文章
 * @param id 文章id
 * @param cookie
 * @returns {*}
 */
export const collect = (id, cookie) => {
    return getFetch(service_url(`https://www.wanandroid.com/lg/collect/${id}/json`), {}, cookie);
};

/**
 * 取消收藏站内文章
 * @param id 文章id
 * @param cookie
 * @returns {*}
 */
export const cancelCollect = (id, cookie) => {
    return getFetch(service_url(`https://www.wanandroid.com/lg/uncollect_originId/${id}/json`), {}, cookie);
};