import React, {Component} from "react";
import {
    Image,
    View,
    Text,
    StyleSheet,
    Platform,
    TouchableWithoutFeedback,
} from "react-native";
import {C9, mainColor, screenWidth} from "../../configs";
import WaitLoadingView from "../component/WaitLoadingView";
import ErrorView from "../component/ErrorView";
import {UltimateListView} from "react-native-ultimate-listview";
import {getBanner, getHomeList} from "../../http/api_wan_android";
import {createAppContainer, createStackNavigator} from "react-navigation";
import Swiper from 'react-native-swiper'
import WanItemView from "./WanItemView";

const h = Platform.select({'android': screenWidth * 0.42, "ios": screenWidth * 0.44});

/**
 * 玩安卓
 */
class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            column: 1,
            layout: "list",
            // banner相关
            data: null,
            index: 0
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `玩安卓`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
    });

    fetchData = (page = 0, startFetch, abortFetch) => {
        getHomeList(page)
            .then((list) => {
                this.setState({
                    isLoading: false,
                });
                startFetch(list.data.datas, 20)
            })
            .catch((err) => {
                abortFetch();
                this.setState({
                    error: true,
                    errorInfo: err
                })
            });
    };

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

    componentDidMount() {
        this.getBanners();
        this.fetchData();
    }

    renderData() {
        return (
            <UltimateListView
                header={this.header.bind(this)}
                initPage={0}
                key={this.state.layout}
                onFetch={this.fetchData.bind(this)}
                keyExtractor={(item, index) => `${index} - ${item}`}
                allLoadedText={'没有更多数据了'}
                refreshableTitleRefreshing={'正在加载...'}
                refreshableTitleRelease={'释放刷新'}
                refreshableTitlePull={'下拉刷新'}
                waitingSpinnerText={''}
                dateTitle={'最近更新：'}
                item={this.renderItemView.bind(this)}
                separator={this.space.bind(this)}
                maxToRenderPerBatch={10}
                updateCellsBatchingPeriod={100}
            />
        );
    }

    space() {
        return <View style={{
            height: 0.5,
            backgroundColor: C9
        }}/>;
    }

    render() {
        // 第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return <WaitLoadingView/>;
        } else if (this.state.error) {
            return <ErrorView error={this.state.errorInfo}/>;
        }
        // 加载数据
        return this.renderData();
    }

    renderItemView(item, index, separator) {
        return (
            <WanItemView item={item}/>
        );
    }

    header() {
        return (
            <View style={styles.header}>
                {this.state.data != null ?
                    <View style={{height: h}}>
                        <Swiper
                            autoplay={true}
                            showsPagination={false}
                            onMomentumScrollEnd={(e, state, context) => {
                                this.setState(
                                    {index: state.index}
                                )
                            }}
                        >
                            {
                                this.state.data.map((value, i) => this.renderItem(value, i))
                            }
                        </Swiper>
                        <View style={styles.views}>
                            <Text numberOfLines={1}
                                  style={[styles.text, {
                                      flex: 1,
                                      marginEnd: 15
                                  }]}>{this.state.data[this.state.index].title}</Text>
                            <Text style={styles.text}>{`${this.state.index + 1}/${this.state.data.length}`}</Text>
                        </View>
                    </View> : <Text/>}
            </View>
        )
    }

    renderItem(value, i) {
        return (
            <TouchableWithoutFeedback
                key={'index' + i}
                style={styles.slide}
                onPress={() => {
                    Actions.webView({"url": value.url, "title": value.title});
                }}>
                <Image resizeMode='stretch' style={styles.image} source={{uri: value.imagePath}}/>
            </TouchableWithoutFeedback>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        height: h,
        backgroundColor: '#dfdfdf',
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
    views: {
        alignContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: h - 30,
        backgroundColor: 'rgba(0,0,0,.3)',
        width: screenWidth,
        height: 30,
        paddingStart: 10,
        paddingEnd: 10,
        flexDirection: 'row',
    }
});

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