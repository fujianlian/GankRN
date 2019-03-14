import React, {Component} from 'react';
import {
    Image,
    TextInput,
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    Picker, Platform
} from 'react-native';
import {background, C21, mainColor, screenWidth, showToast} from "../../configs";
import {add2Gank} from "../../http/api_gank";
import {Actions} from "react-native-router-flux";

const margin = Platform.select({android: 12, ios: 0});
const pickWidth = Platform.select({android: screenWidth - 12, ios: screenWidth});

/**
 * 干货发布
 */
export default class AddGankView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 400,
            type: "Android",
            url: "",
            desc: "",
            who: "",
        }
    }

    componentWillMount() {
        DeviceEventEmitter.addListener('send', this.send.bind(this));
    }


    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('send');
    }

    render() {
        return (
            <View style={background}>
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请输入网址'}
                    onChangeText={(text) => this.setState({url: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    autoFocus={true}
                    selectionColor={mainColor}
                    value={this.state.text}
                />
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请输入描述'}
                    onChangeText={(text) => this.setState({desc: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    autoFocus={true}
                    selectionColor={mainColor}
                    value={this.state.text}
                />
                <TextInput
                    style={styles.textStyle}
                    placeholder={'请输入昵称'}
                    onChangeText={(text) => this.setState({who: text})}
                    padding={0}
                    clearButtonMode={'while-editing'}
                    selectionColor={mainColor}
                    value={this.state.text}
                />
                <Picker
                    selectedValue={this.state.type}
                    style={{width: pickWidth, marginTop: 15, marginStart: margin}}
                    onValueChange={(itemValue) => this.setState({type: itemValue})}>
                    <Picker.Item label="APP" value="App"/>
                    <Picker.Item label="iOS" value="iOS"/>
                    <Picker.Item label="Android" value="Android"/>
                    <Picker.Item label="福利" value="福利"/>
                    <Picker.Item label="前端" value="前端"/>
                    <Picker.Item label="休息视频" value="休息视频"/>
                    <Picker.Item label="拓展资源" value="拓展资源"/>
                    <Picker.Item label="瞎推荐" value="瞎推荐"/>
                </Picker>
            </View>
        );
    }

    send() {
        if (this.isNull(this.state.url)) {
            showToast('请输入网址')
        } else if (this.isNull(this.state.desc)) {
            showToast('请输入描述')
        } else if (this.isNull(this.state.who)) {
            showToast('请输入昵称')
        } else {
            let map = new Map();
            map['url'] = this.state.url;
            map['desc'] = this.state.desc;
            map['who'] = this.state.who;
            map['type'] = this.state.type;
            map['debug'] = false;
            add2Gank(map).then((data) => {
                if (!data.error) {
                    showToast('发布成功');
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

AddGankView.renderRightButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => {
            DeviceEventEmitter.emit('send');
        }} style={{padding: 10}}>
            <Image source={require('../../image/right.png')} style={{height: 27, width: 27}}/>
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
    }
};
