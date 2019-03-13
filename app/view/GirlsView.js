import React, {Component} from "react";
import {
    ActivityIndicator, Image, RefreshControl,
    FlatList,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from "react-native";
import {getCategoryData} from "../http/api_gank";
import {Actions} from 'react-native-router-flux';
import {isIphoneX, mainColor} from "../configs";

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const width = dimensions.get('window').width;
const marginBottom = isIphoneX() ? 20 : 0;

export default class GirlsView extends Component {

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
        }
    }

    //网络请求
    fetchData() {
        getCategoryData("福利", this.state.page)
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

    //加载等待的view
    static renderLoadingView() {
        return (
            <View style={styles.container}>
                <ActivityIndicator
                    animating={true}
                    style={[styles.gray, {height: 80}]}
                    color={mainColor}
                    size="large"
                />
            </View>
        );
    }

    renderData() {
        return (
            <FlatList
                style={{marginBottom: marginBottom,}}
                data={this.state.dataArray}
                renderItem={({item}) => GirlsView.renderItemView(item)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this.onFresh()}//因为涉及到this.state
                        colors={[mainColor]}
                        progressBackgroundColor="#ffffff"
                    />
                }
                numColumns={2}
            />
        );
    }

    onFresh() {
        this.state.page = 1;
        this.fetchData();
    }

    render() {
        //第一次加载等待的view
        if (this.state.isLoading && !this.state.error) {
            return GirlsView.renderLoadingView();
        } else if (this.state.error) {
            //请求失败view
            return GirlsView.renderErrorView(this.state.errorInfo);
        }
        //加载数据
        return this.renderData();
    }

    static renderItemView(item) {
        return (
            <TouchableHighlight
                style={styles.itemPadding}
                underlayColor='transparent'
                onPress={() =>
                    Actions.photo({"url": item.url, "title": item.desc})
                }>
                <Image source={{uri: item.url}} style={{height: width * 0.60 - 7, width: width * 0.5 - 7}}/>
            </TouchableHighlight>

        );
    }


    static renderErrorView(error) {
        return (
            <View style={styles.container}>
                <Text>
                    Fail: {error}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    title: {
        fontSize: 15,
        color: 'blue',
    },
    content: {
        fontSize: 15,
        color: 'black',
    },
    itemPadding: {
        padding: 3.5,
        height: width * 0.60,
        width: width / 2,
    }
});
