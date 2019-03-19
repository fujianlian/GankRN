import React, {Component} from "react";
import {Platform, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {mainColor, screenWidth} from "../../configs";

import {getQQBanner} from "../../http/api_wan_android";
import Swiper from 'react-native-swiper'
import {Actions} from "react-native-router-flux";

const h = Platform.select({'android': screenWidth * 0.4, "ios": screenWidth * 0.44});
const styles = {

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

    views: {
        position: 'absolute',
        top: h - 30,
        backgroundColor: 'rgba(0,0,0,.3)',
        width: screenWidth,
        height: 30,
        textAlign: 'center',
        textAlignVertical: 'center',
        justifyContent: 'center',
        paddingStart: 10,
        paddingEnd: 12 * 4 + 20
    }


};

// 每日推荐
export default class DailyView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            index: 0
        }
    }

    componentDidMount() {
        getQQBanner()
            .then((list) => {
                this.setState({
                    data: list.data.slider,
                });
            })
    }

    render() {
        return (
            <View style={{
                height: h, backgroundColor: '#dfdfdf',
            }}>
                {this.state.data != null ?
                    <View style={{height: h}}>
                        <Swiper
                            autoplay={true}
                            onMomentumScrollEnd={(e, state, context) => {
                                this.setState(
                                    {index: state.index}
                                )
                            }}
                            dot={<View style={{
                                backgroundColor: 'rgba(255,255,255,.5)',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            activeDot={<View style={{
                                backgroundColor: mainColor,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            paginationStyle={{bottom: 7,}}>
                            {
                                this.state.data.map((value, i) => this.renderItem(value, i))
                            }
                        </Swiper>
                    </View> : <Text/>}
            </View>
        );
    }

    renderItem(value, i) {
        return (
            <TouchableWithoutFeedback
                key={'index' + i}
                style={styles.slide}
                onPress={() => {
                    Actions.webView({"url": value.linkUrl});
                }}>
                <Image resizeMode='stretch' style={styles.image} source={{uri: value.picUrl}}/>
            </TouchableWithoutFeedback>
        );
    }
}