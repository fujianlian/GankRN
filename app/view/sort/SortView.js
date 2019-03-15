import React, {Component} from "react";
import {TouchableOpacity} from "react-native";
import {Actions} from 'react-native-router-flux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import {createAppContainer, createStackNavigator} from "react-navigation";
import {C1, mainColor} from "../../configs";
import {SortTabView} from "./SortTabView";
import {QYScrollableTabBar} from "../component/QYScrollableTabBar";
import Icon from 'react-native-vector-icons/Ionicons';

class SortView extends Component {

    static navigationOptions = ({navigation}) => ({
        title: `分类`,
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
                initialPage={1}
                style={{borderBottomWidth: 0}}
                tabBarActiveTextColor={mainColor}
                tabBarTextStyle={{fontSize: 15}}
                tabBarInactiveTextColor={C1}
                tabBarUnderlineStyle={{height: 2, backgroundColor: mainColor}}
            >
                <SortTabView tabLabel="全部"/>
                <SortTabView tabLabel="Android"/>
                <SortTabView tabLabel="iOS"/>
                <SortTabView tabLabel="App"/>
                <SortTabView tabLabel="前端"/>
                <SortTabView tabLabel="休息视频"/>
                <SortTabView tabLabel="拓展资源"/>
                <SortTabView tabLabel="瞎推荐"/>
            </ScrollableTabView>
        );
    }
}


const RootStack = createStackNavigator(
    {
        sort: {
            screen: SortView,
        },
    },
    {
        initialRouteName: 'sort',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class SortTab extends React.Component {
    render() {
        return <AppContainer/>;
    }
}