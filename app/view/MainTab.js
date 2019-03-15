/**
 * 主页面
 * @flow
 */
import React, {Component} from 'react';

import HomeView from './HomeView'
import SortView from './sort/SortView'
import GirlsTab from './photo/GirlsView'
import PersonalView from './PersonalView'

import ScrollableTabView from 'react-native-scrollable-tab-view';
import HomeTabBar from '../view/component/HomeTabBar';

export default class MainTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tabNames: ['主页', '分类', '妹纸', '我的'],
            tabIconNames: ['ios-home', 'ios-grid', 'ios-image', 'ios-contact'],
        };
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={() => <HomeTabBar tabNames={tabNames} tabIconNames={tabIconNames}/>}
                tabBarPosition={'bottom'}
                locked={true}
                initialPage={0}
                scrollWithoutAnimation={true}>
                <HomeView/>
                <SortView/>
                <GirlsTab/>
                <PersonalView/>
            </ScrollableTabView>
        );
    }
}