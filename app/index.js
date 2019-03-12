/**
 * 干货集中营 React Native App
 * https://github.com/fujianlian/GankRN
 */
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen'
import RootView from './root'

export default class GankRN extends Component {

    componentDidMount() {
        // 启动页隐藏
        SplashScreen.hide();
    }

    render() {
        return (<RootView/>);
    }
};

