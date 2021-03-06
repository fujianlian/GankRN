import React, {Component} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";
import {C2} from "../../configs";

/**
 * 列表底部正在加载
 */
export default class FootLoadMore extends Component {

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator/>
                <Text style={styles.title}>{'玩命加载数据~'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        color: C2,
        padding: 15,
        marginLeft: 5
    },
});
