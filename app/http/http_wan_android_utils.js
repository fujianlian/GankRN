/** 基于fetch 封装的网络请求工具类 **/

import {Component} from "react";
import {showToast} from "../configs";

/**
 * fetch 网络请求的header，可自定义header 内容
 * @type {{Accept: string, Content-Type: string, accessToken: *}}
 */
let header = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};

/**
 * GET 请求时，拼接请求URL
 * @param url 请求URL
 * @param params 请求参数
 * @returns {*}
 */
const handleUrl = (url) => (params) => {
    if (params) {
        let paramsArray = [];
        Object.keys(params).forEach((key) =>
            paramsArray.push(key + "=" + encodeURIComponent(params[key]))
        );
        if (url.search(/\?/) === -1) {
            typeof params === "object" ? (url += "?" + paramsArray.join("&")) : url;
        } else {
            url += "&" + paramsArray.join("&");
        }
    }
    return url;
};

/**
 * fetch 网络请求超时处理
 * @param originalFetch 原始的fetch
 * @param timeout 超时时间 10s
 * @returns {Promise.<*>}
 */
const timeoutFetch = (originalFetch, timeout = 10000) => {
    let timeoutBlock = () => {
    };
    let timeoutPromise = new Promise((resolve, reject) => {
        timeoutBlock = () => {
            // 请求超时处理
            reject("timeout promise");
        };
    });

    // Promise.race(iterable)方法返回一个promise
    // 这个promise在iterable中的任意一个promise被解决或拒绝后，立刻以相同的解决值被解决或以相同的拒绝原因被拒绝。
    let abortablePromise = Promise.race([originalFetch, timeoutPromise]);

    setTimeout(() => {
        timeoutBlock();
    }, timeout);

    return abortablePromise;
};

/**
 * 网络请求工具类
 */
export default class HttpUtils extends Component {
    /**
     * 基于fetch 封装的GET 网络请求
     * @param url 请求URL
     * @param params 请求参数
     * @returns {Promise}
     */
    static getRequest = (url, params = {}) => {
        return timeoutFetch(
            fetch(handleUrl(url)(params), {
                method: "GET",
                headers: header
            })
        ).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                showToast('服务器繁忙，请稍后再试！')
            }
        }).then((response) => {
            if (response.errorCode !== 0) {
                showToast(response.errorMsg);
                return response;
            } else {
                return response;
            }
        }).catch((error) => {
            showToast('当前网络不可用，请检查网络设置！')
        });
    };

    /**
     * 基于fetch 的 POST 请求
     * @param url 请求的URL
     * @param params 请求参数
     * @returns {Promise}
     */
    static postRequest = (url, params = {}) => {
        let formData = new FormData();
        Object.keys(params).forEach((key) => formData.append(key, params[key]));
        return timeoutFetch(
            fetch(url, {
                method: "POST",
                body: formData
            })
        ).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                showToast('服务器繁忙，请稍后再试！')
            }
        }).then((response) => {
            if (response.errorCode !== 0) {
                showToast(response.errorMsg);
                return response;
            } else {
                return response;
            }
        }).catch((error) => {
            showToast('当前网络不可用，请检查网络设置！')
        });
    };
}