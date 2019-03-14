import React, {Component} from "react";
import {
    Image,
    FlatList,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    DeviceEventEmitter, View, Text
} from "react-native";
import {getCategoryData} from "../../http/api_gank";
import {Actions} from 'react-native-router-flux';
import {isIphoneX, mainColor, screenWidth} from "../../configs";
import {createAppContainer, createStackNavigator} from "react-navigation";
import WaitLoadingView from "../component/WaitLoadingView";
import ErrorView from "../component/ErrorView";
import FootLoadMore from "../component/FootLoadMore";
import FootNoMore from "../component/FootNoMore";

const marginBottom = isIphoneX() ? 20 : 0;

let pageNo = 1;
let isLoadFinish = false;

class GirlsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isRefreshing: false,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            column: 2,
            // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
            showFoot: 0,
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `妹纸`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
        headerRight: (
            <TouchableOpacity
                style={{paddingStart: 10, paddingEnd: 10}}
                onPress={() => {
                    DeviceEventEmitter.emit('rightNavBarAction');
                }}>
                <Image
                    style={{height: 25, width: 25,}}
                    source={require('../../image/switch.png')}
                />
            </TouchableOpacity>)
    });

    componentWillMount() {
        DeviceEventEmitter.addListener('rightNavBarAction', this.setColumn.bind(this));
    }


    componentWillUnmount() {
        DeviceEventEmitter.removeAllListeners('rightNavBarAction');
    }

    setColumn() {
        let c = this.state.column === 2 ? 1 : 2;
        this.setState({
            column: c,
        });
    }

    //网络请求
    fetchData(page): Function {
        getCategoryData("福利", page)
            .then((list) => {
                let foot = 0;
                if (list == null || list.results.length < 16) {
                    foot = 1;
                }
                let dataBlob = [];
                if (pageNo === 1) {
                    dataBlob = list.results;
                } else {
                    dataBlob = this.state.dataArray;
                    list.results.map(function (item) {
                        dataBlob.push(item);
                    });
                }
                this.setState({
                    dataArray: dataBlob,
                    isLoading: false,
                    isRefreshing: false,
                    showFoot: foot,
                });
                dataBlob = null;
            })
            .catch((error) => {
                this.setState({
                    error: true,
                    errorInfo: error
                })
            });
    }

    componentDidMount() {
        //请求数据
        this.fetchData(pageNo);
    }

    renderData() {
        return (
            <FlatList
                style={{marginBottom: marginBottom,}}
                data={this.state.dataArray}
                renderItem={({item}) => this.renderItemView(item)}
                key={(this.state.column === 2 ? 'vShow' : 'hShow')}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={this._onFresh.bind(this)}
                refreshing={this.state.isRefreshing}
                numColumns={this.state.column}
                getItemLayout={(data, index) => (
                    this.state.column === 2
                        ? {length: screenWidth * 0.60, offset: screenWidth * 0.60 * index, index}
                        : {length: screenWidth * 0.8, offset: screenWidth * 0.8 * index, index}
                )}
                ListFooterComponent={this._renderFooter.bind(this)}
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
            />
        );
    }

    _onFresh() {
        pageNo = 1;
        this.fetchData(pageNo);
    }

    _renderFooter() {
        if (this.state.showFoot === 1) {
            return (<FootNoMore/>);
        } else if (this.state.showFoot === 2) {
            return (<FootLoadMore/>);
        } else if (this.state.showFoot === 0) {
            return (<View/>);
        }
    }

    _onEndReached() {
        // 如果是正在加载中或没有更多数据了，则返回
        if (this.state.showFoot !== 0 || isLoadFinish) {
            return;
        }
        pageNo++;
        // 底部显示正在加载更多数据
        this.setState({showFoot: 2});
        // 获取数据
        this.fetchData(pageNo);
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

    renderItemView(item) {
        let isDouble = this.state.column === 2;
        let w = isDouble ? screenWidth * 0.5 - 7 : screenWidth - 7;
        let h = isDouble ? screenWidth * 0.60 - 7 : screenWidth * 0.8 - 7;
        let style = isDouble ? styles.itemPadding : styles.itemPadding1;
        return (
            <TouchableHighlight
                style={style}
                underlayColor='transparent'
                onPress={() =>
                    Actions.photo({"url": item.url, "title": item.desc})
                }>
                <Image
                    defaultSource={require('../../image/fuli.png')}
                    source={{uri: item.url}} style={{height: h, width: w}}
                />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    itemPadding: {
        padding: 3.5,
        height: screenWidth * 0.60,
        width: screenWidth / 2,
    },
    itemPadding1: {
        padding: 3.5,
        height: screenWidth * 0.8,
        width: screenWidth,
    }
});


const RootStack = createStackNavigator(
    {
        photo: {
            screen: GirlsView,
        },
    },
    {
        initialRouteName: 'photo',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class GirlsTab extends React.Component {
    render() {
        return <AppContainer/>;
    }
}