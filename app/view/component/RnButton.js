import React, {Component} from "react";
import {Text, StyleSheet, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {mainColor, screenWidth} from "../../configs";

export default class RnButton extends Component {
    state = {
        status: 1,
        disabled: false,
    };
    onPress = () => {
        const {onPress} = this.props;
        onPress ? onPress() : "";
    };
    enable = () => {
        this.setState({
            disabled: false,
        })
    };
    disabled = () => {
        this.setState({
            disabled: true,
        })
    };

    render() {
        const {name, backgroundColor} = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.button,
                    {backgroundColor: backgroundColor ? backgroundColor : mainColor},
                    this.state.disabled && styles.disabled]}
                onPress={this.onPress}>
                <Text style={styles.buttonText}>{name}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        width: screenWidth - 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: mainColor,
        justifyContent: 'center',
        overflow: 'hidden',
        marginHorizontal: 20,
        marginTop: 30
    },
    buttonText: {
        textAlign: 'center',
        color: "white",
        fontSize: 16,
        fontWeight: "400"
    },
    disabled: {
        backgroundColor: '#80ff0000',
    },
});