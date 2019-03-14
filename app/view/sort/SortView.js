import React, {Component} from "react";
import {
    Image,
    FlatList,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    DeviceEventEmitter
} from "react-native";
import {getCategoryData} from "../../http/api_gank";
import {Actions} from 'react-native-router-flux';
import {isIphoneX, mainColor} from "../../configs";
import {createAppContainer, createStackNavigator} from "react-navigation";
import WaitLoadingView from "../component/WaitLoadingView";
import ErrorView from "../component/ErrorView";

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const width = dimensions.get('window').width;
const marginBottom = isIphoneX() ? 20 : 0;

class SortView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isRefreshing: false,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            page: 1,
            column: 2,
        };
    }

    static navigationOptions = ({navigation}) => ({
        title: `分类`,
        headerTintColor: "white",
        headerStyle: {backgroundColor: mainColor},
        headerRight: (
            <TouchableOpacity
                style={{paddingStart: 10, paddingEnd: 10}}
                activeOpacity={0.5}
                onPress={() => {
                    Actions.addGank();
                }}>
                <Image
                    style={{height: 26, width: 26,}}
                    source={require('../../image/add.png')}
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
    fetchData(): Function {
        getCategoryData("福利", 1)
            .then((list) => {
                this.setState({
                    dataArray: list.results,
                    isLoading: false,
                    isRefreshing: false,
                });
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
        this.fetchData();
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
                        ? {length: width * 0.60, offset: width * 0.60 * index, index}
                        : {length: width * 0.8, offset: width * 0.8 * index, index}
                )}
            />
        );
    }

    _onFresh() {
        this.fetchData();
    }

    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return <WaitLoadingView/>;
        } else if (this.state.error) {
            return <ErrorView error={this.state.errorInfo}/>;
        }
        //加载数据
        return this.renderData();
    }

    renderItemView(item) {
        let isDouble = this.state.column === 2;
        let w = isDouble ? width * 0.5 - 7 : width - 7;
        let h = isDouble ? width * 0.60 - 7 : width * 0.8 - 7;
        let style = isDouble ? styles.itemPadding : styles.itemPadding1;
        return (
            <TouchableHighlight
                style={style}
                underlayColor='transparent'
                onPress={() =>
                    Actions.photo({"url": item.url, "title": item.desc})
                }>
                <Image source={{uri: item.url}} style={{height: h, width: w}}/>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    itemPadding: {
        padding: 3.5,
        height: width * 0.60,
        width: width / 2,
    },
    itemPadding1: {
        padding: 3.5,
        height: width * 0.8,
        width: width,
    }
});

const RootStack = createStackNavigator(
    {
        sort: {
            screen: SortView,
        },
    },
    {
        initialRouteName: 'sort',
    }
);

const AppContainer = createAppContainer(RootStack);

export default class SortTab extends React.Component {
    render() {
        return <AppContainer/>;
    }
}