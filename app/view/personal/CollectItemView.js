import React, {PureComponent} from "react";
import {Platform, StyleSheet, Text, TouchableHighlight, TouchableNativeFeedback, View,} from "react-native";
import {Actions} from "react-native-router-flux";
import {C1, C3, mainColor} from "../../configs";

export default class CollectItemView extends PureComponent {

    render(): React.ReactNode {
        return this.setPlatform()
    }

    setPlatform() {
        if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    onPress={() => {
                        Actions.webView({"url": this.props.item.link, "title": this.props.item.title})
                    }}
                    underlayColor={'rgba(223,223,223,0.5)'}>
                    {this.rendItem()}
                </TouchableHighlight>)
        } else {
            return <TouchableNativeFeedback
                onPress={() => {
                    Actions.webView({"url": this.props.item.link, "title": this.props.item.title})
                }}
                background={TouchableNativeFeedback.SelectableBackground()}>
                {this.rendItem()}
            </TouchableNativeFeedback>
        }
    }

    rendItem() {
        return <View style={styles.item}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.text1}>
                    {this.props.item.chapterName}
                </Text>
            </View>
            <Text
                numberOfLines={3}
                style={styles.title}>{this.props.item.title}
            </Text>
            <Text style={styles.text}>
                {this.props.item.niceDate} · {this.props.item.author}
            </Text>
        </View>
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        padding: 10
    },
    news: {
        fontSize: 14,
        color: mainColor,
        flex: 1,
        fontStyle: "italic"
    },
    text: {
        color: C3, fontSize: 12, marginTop: 10
    },
    text1: {
        color: C3, fontSize: 14,
    },
    title: {
        color: C1,
        fontSize: 15,
        lineHeight: 20,
        flex: 1,
        marginTop: 10
    }
});