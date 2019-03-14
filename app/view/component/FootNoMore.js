import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import {C2} from "../../configs";

/**
 * 列表底部加载完毕
 */
export default class FootLoadMore extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{'没有更多数据了~'}</Text>
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
    },
});
