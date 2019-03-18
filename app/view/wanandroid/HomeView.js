import React, {Component} from "react";
import {Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {createAppContainer, createStackNavigator} from "react-navigation";
import {C3, mainColor, screenWidth} from "../../configs";

import {getBanner} from "../../http/api_wan_android";
import Swiper from 'react-native-swiper'
import {Actions} from "react-native-router-flux";

const h = screenWidth * 0.44;
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

class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            index: 0
        }
    }

    componentDidMount() {
        this.getBanners();
    }

    //网络请求
    getBanners() {
        getBanner()
            .then((list) => {
                this.setState({
                    data: list.data,
                });
            })
            .catch((err) => {
                this.setState({
                    error: true,
                    errorInfo: err
                })
            });
    };

    static navigationOptions = ({navigation}) => ({
        title: `玩安卓`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
    });

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
                                backgroundColor: 'rgba(0,0,0,.5)',
                                width: 5,
                                height: 5,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            activeDot={<View style={{
                                backgroundColor: 'red',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            paginationStyle={{
                                bottom: 7, left: null, right: 10
                            }}>
                            {
                                this.state.data.map((value) => this.renderItem(value))
                            }
                        </Swiper>
                        <View style={styles.views}>
                            <Text numberOfLines={1} style={styles.text}>{this.state.data[this.state.index].title}</Text>
                        </View>
                    </View> : <Text/>}
            </View>
        );
    }

    renderItem(value) {
        return (
            <TouchableWithoutFeedback
                style={styles.slide}
                onPress={() => {
                    Actions.webView({"url": value.url});
                }}>
                    <Image resizeMode='stretch' style={styles.image} source={{uri: value.imagePath}}/>
            </TouchableWithoutFeedback>

        );
    }
}


const RootStack = createStackNavigator(
    {
        home: {
            screen: HomeView,
        },
    },
    {
        initialRouteName: 'home',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class HomeTab extends React.Component {
    render() {
        return <AppContainer/>;
    }
}