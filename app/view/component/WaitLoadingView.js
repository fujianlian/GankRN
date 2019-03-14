import React, {Component} from "react";
import {ActivityIndicator, View} from "react-native";
import {container, mainColor} from "../../configs";

/**
 * 等待加载页面
 */
export default class WaitLoadingView extends Component {

    render() {
        return (
            <View style={container}>
                <ActivityIndicator
                    animating={true}
                    style={{height: 80}}
                    color={mainColor}
                    size="large"
                />
            </View>
        );
    }
}