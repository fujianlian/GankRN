/**
 * 主页面
 * @flow
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Platform,
} from 'react-native';
import TabNavigator from "react-native-tab-navigator";

import HomeView from './HomeView'
import SortView from './SortView'
import GirlsTab from './photo/GirlsView'
import PersonalView from './PersonalView'

import {mainColor, isIphoneX, C2, T6} from '../configs/index.js';

const HomeIcon = require('../image/home.png');
const HomeSelectIcon = require('../image/home_select.png');

const SortIcon = require('../image/sort.png');
const SortSelectIcon = require('../image/sort_select.png');

const GirlIcon = require('../image/photo.png');
const GirlSelectIcon = require('../image/photo_select.png');

const PersonIcon = require('../image/person.png');
const PersonSelectIcon = require('../image/person_select.png');

const TabStyle = isIphoneX() ? {height: 70, paddingTop: 3, paddingBottom: 15} :
    Platform.select({android: {paddingTop: 5}, ios: {paddingTop: 3}});

export default class MainTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
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
                        <GirlsTab onPressTab={this._onPressTab.bind(this)}/>
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