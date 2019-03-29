import Toast from 'react-native-root-toast';

//获取屏幕的宽度和高度
export const screenWidth = require('Dimensions').get('window').width;

export const screenHeight = require('Dimensions').get('window').height;

export const showToast = (msg) => {
    Toast.show(msg, {
        duration: Toast.durations.SHORT, // toast显示时长
        position: Toast.positions.CENTER, // toast位置
        shadow: false, // toast是否出现阴影
        animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
        hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
        delay: 0, // toast显示的延时
    });
};

/**
 * 获取wanandroid cookie
 * @param username 用户名
 * @param password 密码
 * @returns {string}
 */
export const getCookie = (username, password) => {
    return "loginUserName=" + username + ";loginUserPassword=" + password
};