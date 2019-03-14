/**
 * 干货集中营 React Native App
 * https://github.com/fujianlian/GankRN
 */
import React, {Component} from 'react';
import SplashScreen from 'react-native-splash-screen'
import RootView from './root'

export default class GankRN extends Component {

    componentDidMount() {
        this.timer = setTimeout(
            () => {
                // 启动页隐藏
                SplashScreen.hide();
            },
            500
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (<RootView/>);
    }
};

