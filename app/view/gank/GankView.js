import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {createAppContainer, createStackNavigator} from "react-navigation";
import {C1, mainBackColor, mainColor} from "../../configs";
import {QYScrollableTabBar} from "../component/QYScrollableTabBar";
import Icon from 'react-native-vector-icons/Ionicons';
import DailyView from './DailyView';
import FuliView from './FuliView';
import GankSortView from "./GankSortView";
import AndroidView from "./AndroidView";

class GankView extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `干货营`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
        headerRight: (
            <TouchableOpacity
                style={{paddingStart: 15, paddingEnd: 15}}
                activeOpacity={0.5}
                onPress={() => {
                    Actions.addGank();
                }}>
                <Icon name={'md-add'} size={28} color={'white'}/>
            </TouchableOpacity>)
    });

    render() {
        return (
            <ScrollableTabView
                renderTabBar={() => <QYScrollableTabBar/>}
                initialPage={0}
                style={{borderBottomWidth: 0, backgroundColor: mainBackColor}}
                tabBarActiveTextColor={mainColor}
                tabBarTextStyle={{fontSize: 15}}
                tabBarInactiveTextColor={C1}
                tabBarUnderlineStyle={{height: 2, backgroundColor: mainColor}}
            >
                <DailyView tabLabel="每日推荐"/>
                <FuliView tabLabel="福利"/>
                <GankSortView tabLabel="干货定制"/>
                <AndroidView tabLabel="安卓"/>
            </ScrollableTabView>
        );
    }
}


const RootStack = createStackNavigator(
    {
        gank: {
            screen: GankView,
        },
    },
    {
        initialRouteName: 'gank',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class GankTab extends React.Component {
    render() {
        return <AppContainer/>;
    }
}