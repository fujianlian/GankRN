import React, {Component} from 'react';
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    DeviceEventEmitter,
    AsyncStorage
} from 'react-native';
import {whiteBackground, C21, mainColor, screenWidth, showToast} from "../../configs";
import {Actions} from "react-native-router-flux";
import {login} from "../../http/api_wan_android";
import RnButton from "../component/RnButton";

/**
 * 登录
 */
export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('register', LoginView.goRegister.bind(this));
    }


    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('register');
    }

    render() {
        return (
            <View style={whiteBackground}>
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请输入用户名'}
                    onChangeText={(text) => this.setState({username: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    autoFocus={true}
                    selectionColor={mainColor}
                    value={this.state.text}
                />
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请输入密码'}
                    onChangeText={(text) => this.setState({password: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    selectionColor={mainColor}
                    value={this.state.text}
                />
                <RnButton backgroundColor={mainColor} name={"登录"} onPress={() => {
                    this.send()
                }}/>
            </View>
        );
    }

    send() {
        if (this.isNull(this.state.username)) {
            showToast('请输入用户名')
        } else if (this.isNull(this.state.password)) {
            showToast('请输入密码')
        } else {
            login(this.state.username, this.state.password).then((data) => {
                if (data.errorCode === 0) {
                    this._storeData(data.data.id)
                }
            });
        }
    }

    static goRegister() {
        Actions.register()
    }

    isNull(str) {
        if (str === "") return true;
        let r = "^[ ]+$";
        let re = new RegExp(r);
        return re.test(str);
    }

    _storeData = async (id) => {
        try {
            await AsyncStorage.setItem('isLogin', "true");
            await AsyncStorage.setItem('userName', this.state.username);
            await AsyncStorage.setItem('id', id + "");
            await AsyncStorage.setItem('userPassword', this.state.password);
            showToast('登录成功');
            DeviceEventEmitter.emit('login');
            Actions.pop()
        } catch (error) {
            console.log(error)
        }
    }

}

LoginView.renderRightButton = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={{paddingStart: 15, paddingEnd: 15}}
            onPress={() => {
                DeviceEventEmitter.emit('register');
            }}>
            <Text style={{fontSize: 14, color: "white"}}>注册</Text>
        </TouchableOpacity>
    )
};

const styles = {
    textStyle: {
        marginTop: 20,
        marginStart: 20,
        marginEnd: 20,
        height: 40,
        width: screenWidth - 40,
        borderBottomWidth: 1,
        borderBottomColor: C21
    },
    btnStyle: {
        height: 40,
        margin: 20,
        flex: 1
    },
    loginButton: {
        alignSelf: 'center',
        width: screenWidth - 40,
        height: 40,
        marginTop: 12,
    }
};
