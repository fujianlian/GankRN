import React, {Component} from "react";
import {
    View,
    StyleSheet,
    Platform,
    AsyncStorage, DeviceEventEmitter, Text, TouchableHighlight, TouchableNativeFeedback
} from "react-native";
import {C1, C4, mainBackColor, mainColor, screenWidth} from "../../configs";
import {createAppContainer, createStackNavigator} from "react-navigation";
import PersonalItemView from "./PersonalItemView";
import {Actions} from "react-native-router-flux";

const h = Platform.select({'android': screenWidth * 0.42, "ios": screenWidth * 0.44});

/**
 * 我的
 */
class PersonalView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            id: "",
            userName: "",
            loginText: "玩安卓登录",
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `我的`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
    });

    componentWillMount() {
        this._retrieveData();
    }

    render() {
        return (
            <View style={styles.container}>
                {this.setHeader()}
                <PersonalItemView text={"我的收藏"}/>
                <PersonalItemView text={"点个star"} url={"https://github.com/fujianlian/GankRN"}/>
                <PersonalItemView text={"提Issue/PR"} url={"https://github.com/fujianlian/GankRN/issues"}/>
                <PersonalItemView text={"关于"}/>
            </View>
        );
    }

    setHeader() {
        if (Platform.OS === 'ios') {
            return (
                <TouchableHighlight
                    style={{flexDirection: "row"}}
                    onPress={this._go.bind(this)}
                    underlayColor={'rgba(223,223,223,0.5)'}>
                    <View style={styles.item}>
                        <Text style={styles.text}>
                            {this.state.loginText}
                        </Text>
                        <Text style={styles.text1}>
                            {this.state.userName}
                        </Text>
                    </View>
                </TouchableHighlight>)
        } else {
            return <TouchableNativeFeedback
                style={{flexDirection: "row"}}
                onPress={this._go.bind(this)}
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.item}>
                    <Text style={styles.text}>
                        {this.state.loginText}
                    </Text>
                    <Text style={styles.text1}>
                        {this.state.userName}
                    </Text>
                </View>
            </TouchableNativeFeedback>
        }
    }

    _go() {
        if (!this.state.isLogin) {
            Actions.login()
        }
    }

    _retrieveData = async () => {
        try {
            let isLogin = await AsyncStorage.getItem('isLogin');
            if (isLogin !== null && isLogin === "true") {
                let id = await AsyncStorage.getItem('id');
                let userName = await AsyncStorage.getItem('userName');
                this.setState({
                    id: id,
                    isLogin: true,
                    userName: userName,
                    loginText: "玩安卓",
                });
            }
        } catch (error) {

        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainBackColor,
    },
    item: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        alignItems: "center",
        height: 60,
        marginBottom: 15,
        flexDirection: 'row'
    },
    text: {
        fontSize: 16,
        color: C1,
        flex: 1,
    },
    text1: {
        fontSize: 16,
        color: C1,
        fontWeight: "500"
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