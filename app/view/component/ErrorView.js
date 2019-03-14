import React, {Component} from "react";
import {Text, View} from "react-native";
import {container} from "../../configs";

/**
 * 加载失败页面
 */
export default class ErrorView extends Component {

    render() {
        return (
            <View style={container}>
                <Text>
                    Fail: {this.props.error}
                </Text>
            </View>
        );
    }
}
