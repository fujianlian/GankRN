import React, {Component} from 'react';
import {
    TextInput,
    View,
} from 'react-native';
import {whiteBackground, C21, mainColor, screenWidth, showToast} from "../../configs";
import {Actions} from "react-native-router-flux";
import {register} from "../../http/api_wan_android";
import RnButton from "../component/RnButton";

/**
 * 注册
 */
export default class LoginView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            secondPassword: "",
        }
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
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请再次输入密码'}
                    onChangeText={(text) => this.setState({secondPassword: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    selectionColor={mainColor}
                    value={this.state.text}
                />
                <RnButton backgroundColor={mainColor} name={"注册"} onPress={() => {
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
        } else if (this.isNull(this.state.secondPassword)) {
            showToast('请再次输入密码')
        } else if (this.state.password !== this.state.secondPassword) {
            showToast('两次输入密码不一致')
        } else {
            register(this.state.username, this.state.password).then((data) => {
                if (data.errorCode === 0) {
                    showToast('注册成功');
                    Actions.pop()
                }
            });
        }
    }

    isNull(str) {
        if (str === "") return true;
        let r = "^[ ]+$";
        let re = new RegExp(r);
        return re.test(str);
    }

}

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
