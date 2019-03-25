import React, {Component} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight, RefreshControl,
} from "react-native";
import {getCategoryData} from "../../http/api_gank";
import {C2, C9, mainColor} from "../../configs";
import WaitLoadingView from "../component/WaitLoadingView";
import ErrorView from "../component/ErrorView";
import {UltimateListView} from "react-native-ultimate-listview";
import Icon from 'react-native-vector-icons/Ionicons';
import GankItemView from "./GankItemView";

import ActionSheet from 'react-native-actionsheet'

const types = ['全部', 'App', 'iOS', "前端", '休息视频', '拓展资源', '瞎推荐', '取消'];

/**
 * 干货定制列表
 */
export default class GankSortView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            column: 1,
            layout: "list",
            gankType: "App",
            gankTitle: "App",
            refreshable: false,
        };
    }

    //网络请求
    fetchData = (page = 1, startFetch, abortFetch) => {
        getCategoryData(this.state.gankType, page)
            .then((list) => {
                this.setState({
                    isLoading: false,
                });
                startFetch(list.results, 16)
            })
            .catch((err) => {
                abortFetch();
                console.log("list.results error");

                this.setState({
                    error: true,
                    errorInfo: err,
                })
            });
    };

    componentDidMount() {
        //请求数据
        this.fetchData();
    }

    renderData() {
        return (
            <View>
                <UltimateListView
                    header={this.header.bind(this)}
                    ref={ref => this.listView = ref}
                    key={this.state.layout}
                    onFetch={this.fetchData.bind(this)}
                    keyExtractor={(item, index) => `${index} - ${item}`}
                    refreshable={true}
                    allLoadedText={'没有更多数据了'}
                    waitingSpinnerText={'加载中...'}
                    item={this.renderItemView.bind(this)}
                    maxToRenderPerBatch={16}
                    updateCellsBatchingPeriod={100}
                />

                <ActionSheet
                    ref={o => this.actionSheet = o}
                    title={'选择分类'}
                    options={types}
                    cancelButtonIndex={7}
                    onPress={async (index) => {
                        let type = index === 0 ? "all" : types[index];
                        if (index < 7 && type !== this.state.gankType) {
                            await this.setState({
                                gankType: type,
                                gankTitle: types[index],
                            });
                            this.listView.onRefresh()
                        }
                    }}
                />
            </View>
        );
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
            <GankItemView item={item}/>
        );
    }

    header() {
        return (
            <View style={styles.header}>
                <View style={styles.line}/>
                <Text style={styles.text}>{this.state.gankTitle}</Text>
                <TouchableHighlight
                    style={{borderRadius: 3}}
                    underlayColor={mainColor}
                    onPress={() => {
                        this.actionSheet.show()
                    }}>
                    <View style={styles.choose}>
                        <Icon
                            name={'ios-list'}
                            size={15}
                            color={C2}/>
                        <Text style={{fontSize: 12, marginStart: 5, color: C2}}>选择分类</Text>
                    </View>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        marginHorizontal: 10,
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
    },
    line: {
        borderRadius: 1,
        marginEnd: 10,
        width: 2,
        height: 20,
        backgroundColor: mainColor
    },
    text: {
        fontSize: 16,
        flex: 1,
        fontWeight: '500',
        color: 'black'
    },
    choose: {
        flexDirection: 'row',
        borderRadius: 3,
        borderWidth: 0.5,
        alignContent: 'center',
        alignItems: 'center',
        borderColor: C9,
        padding: 5,
        backgroundColor: '#f8f8f8'
    }
});