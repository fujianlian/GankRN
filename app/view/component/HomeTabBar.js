/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import {C2, C9, isIphoneX, mainColor} from "../../configs"; //这个是图标

const PropTypes = require('prop-types');

export default class HomeTabBar extends Component {
    static propTypes = {
        goToPage: PropTypes.func, // 跳转到对应tab的方法
        activeTab: PropTypes.number, // 当前被选中的tab下标
        tabs: PropTypes.array, // 所有tabs集合
        tabNames: PropTypes.array, // 保存Tab名称
        tabIconNames: PropTypes.array, // 保存Tab图标
    };  // 注意这里有分号


    render() {
        return (
            <View style={styles.tabs}>
                {/*遍历。系统会提供一个tab和下标 调用一个自定义的方法*/}
                {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }

    componentDidMount() {
        // Animated.Value监听范围 [0, tab数量-1]
        this.props.scrollValue.addListener(this.setAnimationValue);
    }

    setAnimationValue({value}) {
        console.log('动画值：' + value);
    }

    //  处理tabbar的颜色和字体及图标
    renderTabOption(tab, i) {
        let color = this.props.activeTab === i ? mainColor : C2; // 判断i是否是当前选中的tab，设置不同的颜色
        return (
            //因为要有点击效果 所以要引入可触摸组件
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => this.props.goToPage(i)}
                style={styles.tab}
                key={tab}>
                <View style={styles.tabItem}>
                    <Icon
                        name={this.props.tabIconNames[i]} // 图标 调用传入的属性
                        size={28}
                        color={color}/>
                    <Text style={{color: color,fontSize:13}}>
                        {this.props.tabNames[i]}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }


}

const paddingBottom = isIphoneX() ? 15 : 0;
const height = isIphoneX() ? 70 : 55;

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: height,
        paddingBottom: paddingBottom,
        backgroundColor: 'white',
        borderTopColor: C9,
        borderTopWidth: 0.3
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
    },

});