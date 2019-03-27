import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Platform,
} from "react-native";
import {C10, mainBackColor, mainColor, screenWidth} from "../../configs";
import {createAppContainer, createStackNavigator} from "react-navigation";
import PersonalItemView from "./PersonalItemView";


const h = Platform.select({'android': screenWidth * 0.42, "ios": screenWidth * 0.44});

/**
 * 我的
 */
class PersonalView extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    static navigationOptions = ({navigation}) => ({
        title: `我的`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
    });

    render() {
        return (
            <View style={styles.container}>
                <PersonalItemView text={"我的收藏"} url={"https://www.baidu.com"}/>
                <PersonalItemView text={"点个star"} url={"https://github.com/fujianlian/GankRN"}/>
                <PersonalItemView text={"提Issue/PR"} url={"https://github.com/fujianlian/GankRN/issues"}/>
                <PersonalItemView text={"关于"} url={"https://www.baidu.com"}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainBackColor,
    },
    slide: {
        height: h,
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 14,
    },
    image: {
        flex: 1
    },
});

const RootStack = createStackNavigator(
    {
        personal: {
            screen: PersonalView,
        },
    },
    {
        initialRouteName: 'personal',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class PersonalTab extends React.Component {
    render() {
        return <AppContainer/>;
    }
}