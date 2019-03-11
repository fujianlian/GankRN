/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import TabNavigator from "react-native-tab-navigator";

import HomeView from './view/HomeView'
import SortView from './view/SortView'
import GirlsView from './view/GirlsView'
import PersonalView from './view/PersonalView'

import {mainColor, isIphoneX, C2, T6} from './configs/index.js';

/** 自定义配置参数 */

const HomeIcon = require('./image/home.png');
const HomeSelectIcon = require('./image/home_select.png');

const SortIcon = require('./image/sort.png');
const SortSelectIcon = require('./image/sort_select.png');

const GirlIcon = require('./image/photo.png');
const GirlSelectIcon = require('./image/photo_select.png');

const PersonIcon = require('./image/person.png');
const PersonSelectIcon = require('./image/person_select.png');

const TabStyle = isIphoneX() ? {height: 65, paddingBottom: 15} : {};

export default class GankRN extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    componentDidMount() {
        // 启动页隐藏
        SplashScreen.hide();
    }

    render() {
        return (<View style={styles.container}>
                <TabNavigator tabBarStyle={[{backgroundColor: 'white', alignItems: 'center'},
                    {...TabStyle}]} tabBarShadowStyle={{backgroundColor: 'transparent'}}>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title='首页'
                        titleStyle={styles.titleStyle}
                        selectedTitleStyle={{color: mainColor}}
                        renderIcon={() => <Image style={styles.icon} source={HomeIcon}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={HomeSelectIcon}/>}
                        onPress={this._onPressTab.bind(this, 'home')}>
                        <HomeView onPressTab={this._onPressTab.bind(this)}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'sort'}
                        title='分类'
                        titleStyle={styles.titleStyle}
                        selectedTitleStyle={{color: mainColor}}
                        renderIcon={() => <Image style={styles.icon} source={SortIcon}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={SortSelectIcon}/>}
                        onPress={this._onPressTab.bind(this, 'sort')}>
                        <SortView onPressTab={this._onPressTab.bind(this)}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'girl'}
                        title='妹纸'
                        titleStyle={styles.titleStyle}
                        selectedTitleStyle={{color: mainColor}}
                        renderIcon={() => <Image style={styles.icon} source={GirlIcon}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={GirlSelectIcon}/>}
                        onPress={this._onPressTab.bind(this, 'girl')}>
                        <GirlsView onPressTab={this._onPressTab.bind(this)}/>
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'mine'}
                        title='我的'
                        titleStyle={styles.titleStyle}
                        selectedTitleStyle={{color: mainColor}}
                        renderIcon={() => <Image style={styles.icon} source={PersonIcon}/>}
                        renderSelectedIcon={() => <Image style={styles.icon} source={PersonSelectIcon}/>}
                        onPress={this._onPressTab.bind(this, 'mine')}>
                        <PersonalView onPressTab={this._onPressTab.bind(this)}/>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }

    _onPressTab = (tabName) => {
        if (this.state.selectedTab !== tabName) {
            this.setState({selectedTab: tabName})
        }
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain'
    },
    titleStyle: {
        color: C2,
        fontSize: T6
    },
    selectedTitleStyle: {
        color: mainColor,
        fontSize: T6
    }
});