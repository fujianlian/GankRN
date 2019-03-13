import React, {Component} from "react";
import {ActivityIndicator, StyleSheet, Text, View} from "react-native";

/**
 * 列表底部加载更多
 */
export default class FootLoadMore extends Component {

    static defaultProps = {
        isNoMore: false
    };

    render() {
        const {isNoMore} = this.props;
        const title = isNoMore ? '没有更多数据了~' : '玩命加载数据~';
        return (
            <View style={styles.container}>
                {!isNoMore && <ActivityIndicator/>}
                <Text style={styles.title}>{title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 15,
        color: '#666',
        marginLeft: 5
    },
});
