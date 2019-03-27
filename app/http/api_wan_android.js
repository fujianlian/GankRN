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
    console.log('page=' + page);
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

export const register = (username, password, repassword) => {
    let map = new Map();
    map['username'] = username;
    map['password'] = password;
    map['repassword'] = repassword;
    return postFetch(service_url(`user/register`), map);
};