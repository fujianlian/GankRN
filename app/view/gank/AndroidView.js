import React, {Component} from "react";
import {getCategoryData} from "../../http/api_gank";
import ErrorView from "../component/ErrorView";
import {UltimateListView} from "react-native-ultimate-listview";
import GankItemView from "./GankItemView";

/**
 * 干货定制列表
 */
export default class AndroidView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
        };
    }

    //网络请求
    fetchData = (page = 1, startFetch, abortFetch) => {
        getCategoryData("Android", page)
            .then((list) => {
                this.setState({
                    isLoading: false,
                });
                startFetch(list.results, 16)
            })
            .catch((err) => {
                abortFetch();
                this.setState({
                    error: true,
                    errorInfo: err
                })
            });
    };

    renderData() {
        return (
            <UltimateListView
                ref={ref => this.listView = ref}
                onFetch={this.fetchData.bind(this)}
                keyExtractor={(item, index) => `${index} - ${item}`}
                allLoadedText={'没有更多数据了'}
                refreshableTitlePull={'下拉刷新...'}
                refreshableTitleRelease={'释放刷新...'}
                refreshableTitleRefreshing={'正在刷新...'}
                waitingSpinnerText={''}
                refreshableMode={'advanced'}
                item={this.renderItemView.bind(this)}
                maxToRenderPerBatch={10}
            />
        );
    }

    render() {
        if (this.state.error) {
            return <ErrorView error={this.state.errorInfo}/>;
        }
        return this.renderData();
    }

    renderItemView(item, index, separator) {
        return (
            <GankItemView item={item}/>
        );
    }
}
