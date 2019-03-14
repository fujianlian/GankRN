import {Platform, Dimensions, StyleSheet, PixelRatio} from "react-native"
import {borderColor, mainColor, navBackColor, placeholderColor} from './index';

/*
 设备的像素密度，例如：
 PixelRatio.get() === 1          mdpi Android 设备 (160 dpi)
 PixelRatio.get() === 1.5        hdpi Android 设备 (240 dpi)
 PixelRatio.get() === 2          iPhone 4, 4S,iPhone 5, 5c, 5s,iPhone 6,xhdpi Android 设备 (320 dpi)
 PixelRatio.get() === 3          iPhone 6 plus , xxhdpi Android 设备 (480 dpi)
 PixelRatio.get() === 3.5        Nexus 6       */

const {width, height} = Dimensions.get("window")
const fontScale = PixelRatio.getFontScale();     //返回字体大小缩放比例
const pixelRatio = PixelRatio.get();             //当前设备的像素密度
const defaultPixel = 2;
console.log(' pixelRatio -->> ', pixelRatio);
//px转换成dp
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(height / h2, width / w2);   //获取缩放比例

const NavBarHeight = Platform.select({android: 50, ios: 70});
const NavPaddingTop = Platform.select({android: 0, ios: 20})
const NavBarContentH = Platform.select({android: NavBarHeight, ios: NavBarHeight - 20})
const lineWidth = StyleSheet.hairlineWidth;
const Textpercent = Platform.select({android: 0.5, ios: 0.32})
const SizePercent = Platform.select({android: 1.1, ios: 1})

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
const HeaderBar = APPBAR_HEIGHT + STATUSBAR_HEIGHT;

/**
 Export Value
 **/
export const W = width
export const H = height

/**
 判断是否为IphoneX
 **/
export function isIphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}


/* 修正不同屏幕 字体和尺寸 */
export function getResponsiveSize(x) {
    return scaleSize(x);
}

/* 字号尺寸 */
export const T1 = scaleSize(36);
export const T2 = scaleSize(32);
export const T3 = scaleSize(30);
export const T4 = scaleSize(26);
export const T5 = scaleSize(24);
export const T6 = scaleSize(22);
export const T7 = scaleSize(16);
export const T8 = scaleSize(28);
export const T9 = scaleSize(18);
export const T10 = scaleSize(40);
export const T11 = scaleSize(26);
export const T12 = scaleSize(34);
export const T13 = scaleSize(46);


/* 字号尺寸 */
export const commonStyle = {
    lineWidth: lineWidth,
    line: {height: lineWidth, backgroundColor: borderColor},
    boldLine: {height: 0.8, backgroundColor: borderColor},
    verticalLine: {width: lineWidth, backgroundColor: borderColor},
    navBar: {
        backgroundColor: navBackColor,
        width: W,
        height: NavBarHeight,
        borderBottomWidth: lineWidth,
        borderBottomColor: borderColor,
        paddingTop: NavPaddingTop,
        flexDirection: 'row',
        alignItems: 'center'
    },
    navBarHeight: NavBarHeight,
    navBackColor: navBackColor,
    navBarContentH: NavBarContentH,
    navPaddingTop: NavPaddingTop,
    centerText: {includeFontPadding: false, textAlign: 'justify', textAlignVertical: 'center'},
    radiusView: {
        height: 20,
        borderRadius: 10,
        borderColor: mainColor,
        borderWidth: lineWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radius26View: {
        height: 20,
        borderRadius: 1,
        borderColor: mainColor,
        borderWidth: lineWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radiusDefaultView: {
        height: 20,
        borderRadius: 1,
        borderColor: placeholderColor,
        borderWidth: lineWidth,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerBar: HeaderBar,
}

/**
 Function
 **/
function setSpText(size: number) {
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return (size / defaultPixel) * Textpercent;
}

function scaleSize(size: number) {
    let sc;
    if (pixelRatio == 2) sc = size / 2;
    else {
        size = Math.round(size * scale + 0.5);
        sc = size / defaultPixel;
    }
    return sc * SizePercent;
}


export const container = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
};