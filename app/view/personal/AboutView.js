import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Platform,
    Text,
    ScrollView, TouchableOpacity, DeviceEventEmitter
} from "react-native";
import {C1, C2, C9, mainBackColor, mainColor, screenWidth} from "../../configs";
import Icon from 'react-native-vector-icons/Ionicons';
import {Actions} from "react-native-router-flux";

const h = Platform.select({'android': screenWidth * 0.42, "ios": screenWidth * 0.44});

/**
 * 我的
 */
export default class AboutView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.textTitle}>简介</Text>
                <View style={styles.line}/>
                <Text style={styles.text}>
                    {"本项目是个人学习React Native的练习项目，UI风格仿照的是youlookwhat的云阅，api主要来自鸿洋的玩安卓以及代码家的" +
                    "干货集中营。"}
                </Text>
                <Text style={styles.text}>
                    {"本项目完全开源，如果你觉得有帮助的话，请帮忙点个star。"}
                </Text>
                {this.clickText("项目源码", "https://github.com/fujianlian/GankRN")}
                <Text style={styles.textTitle}>关于我</Text>
                <View style={styles.line}/>
                <View style={styles.row}>
                    <Icon name={'logo-github'} size={28} color={C1} style={{marginEnd: 12}}/>
                    {this.clickText("@fujianlian", "https://github.com/fujianlian")}
                </View>
                <Text style={styles.text}>
                    {"如果你在使用中遇到问题，欢迎给我提Issue"}
                </Text>
                <Text style={styles.text}>
                    {"如果你有好的想法，欢迎pull request"}
                </Text>
                <Text style={styles.textTitle}>特别感谢</Text>
                <View style={styles.line}/>
                {this.clickText("youlookwhat · 云阅", "https://github.com/youlookwhat/CloudReader")}
                {this.clickText("鸿洋 · 玩安卓", "https://www.wanandroid.com")}
                {this.clickText("代码家 · 干货集中营", "https://gank.io")}
            </ScrollView>
        );
    }

    clickText(text, url) {
        return <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
                Actions.webView({"url": url})
            }}>
            <Text style={styles.textLine}>{text}</Text>
        </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainBackColor,
        paddingHorizontal: 15
    },
    slide: {
        height: h,
        justifyContent: 'center',
    },
    row: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 10,
    },
    text: {
        color: C2,
        fontSize: 16,
        lineHeight: 26
    },
    textLine: {
        color: mainColor,
        fontSize: 18,
        marginVertical: 5,
        textDecorationLine: 'underline'
    },
    textTitle: {
        color: C1,
        fontSize: 18,
        marginVertical: 13,
        fontWeight: "500"
    },
    line: {
        height: 0.5,
        backgroundColor: C9,
        marginBottom: 10,
    },
});
