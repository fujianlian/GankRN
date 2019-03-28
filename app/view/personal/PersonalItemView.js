import React, {PureComponent} from "react";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableHighlight,
    View,
} from "react-native";
import {Actions} from "react-native-router-flux";
import {C1, C4, showToast} from "../../configs";
import Icon from 'react-native-vector-icons/Ionicons';

export default class PersonalItemView extends PureComponent {

    render(): React.ReactNode {
        return this.setPlatform()
    }

    setPlatform() {
        if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    onPress={this.go.bind(this)}
                    underlayColor={'rgba(223,223,223,0.5)'}>
                    {this.rendItem(this.props.text)}
                </TouchableHighlight>)
        } else {
            return <TouchableNativeFeedback
                onPress={this.go.bind(this)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                {this.rendItem(this.props.text)}
            </TouchableNativeFeedback>
        }
    }

    rendItem(text) {
        return <View style={styles.item}>
            <Text style={styles.text}>
                {text}
            </Text>
            <Icon
                name={"ios-arrow-forward"}
                size={26}
                color={C4}/>
        </View>
    }

    go() {
        if (this.props.text === "我的收藏") {
            showToast("下一版本实现")
        } else if (this.props.text === "关于") {
            Actions.about()
        } else {
            Actions.webView({"url": this.props.url, "title": this.props.text})
        }
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        marginTop: 2,
        alignItems: "center",
        height: 50,
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: C1,
        flex: 1,
    },
});