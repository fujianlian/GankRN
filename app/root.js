import {Reducer, Actions, Router, Scene, Stack} from 'react-native-router-flux';

import {View, StatusBar, StyleSheet, Platform, BackHandler} from 'react-native';
import React, {Component} from 'react';
import MainTab from './view/MainTab'
import {C1, mainColor} from "./configs";
import MyWeb from './view/WebPageView'
import PhotoView from './view/photo/PhotoView'
import AddGankView from './view/gank/AddGankView'
import AboutView from './view/personal/AboutView'
import LoginView from './view/personal/LoginView'
import RegisterView from './view/personal/RegisterView'
import CollectView from './view/personal/CollectView'

const statusBackColor = Platform.select({android: "#AE2C25", ios: 'transparent'});

export default class RootView extends Component {
    render() {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' ? <StatusBar barStyle={'light-content'}/> :
                    <StatusBar backgroundColor={statusBackColor}/>}
                <Router createReducer={routerReducerCreate} backAndroidHandler={backAndroidHandler}>
                    <Stack {...FrameStyles}>
                        <Scene key="main" hideNavBar component={MainTab} initial={true}/>
                        <Scene key="webView" component={MyWeb}/>
                        <Scene key="photo" component={PhotoView}/>
                        <Scene key="addGank" title="干货发布" component={AddGankView}/>
                        <Scene key="about" title="关于" component={AboutView}/>
                        <Scene key="login" title="登录" component={LoginView}/>
                        <Scene key="register" title="注册" component={RegisterView}/>
                        <Scene key="collect" title="我的收藏" component={CollectView}/>
                    </Stack>
                </Router>
            </View>
        );
    }
}

const BackTextPadding = Platform.select({android: 5, ios: 2});
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const FrameStyles = {
    navigationBarStyle: {
        backgroundColor: mainColor,
    },
    titleStyle: {
        color: "white",
        alignSelf: 'center',
    },
    rightButtonTextStyle: {
        color: mainColor,
        textAlign: 'justify',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    rightButtonStyle: {
        paddingLeft: 10,
        justifyContent: 'center'
    },
    leftButtonStyle: {},
    backButtonTextStyle: {
        paddingTop: BackTextPadding,
        paddingLeft: 0,
        color: C1,
        textAlign: 'justify',
        includeFontPadding: false,
        textAlignVertical: 'center',
    },
    backButtonTintColor: "white",
};

export const routerReducerCreate = params => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        return defaultReducer(state, action);
    };
};


const backAndroidHandler = () => {
    if (Actions.currentScene === 'main') {
        BackHandler.exitApp();
    } else {
        Actions.pop();
    }
    return true;
};