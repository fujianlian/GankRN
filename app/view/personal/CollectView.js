import React, {Component} from "react";
import ErrorView from "../component/ErrorView";
import {UltimateListView} from "react-native-ultimate-listview";
import {collectList} from "../../http/api_wan_android";
import CollectItemView from "./CollectItemView";
import {View} from "react-native";
import {C9} from "../../configs";

/**
 * 我的收藏
 */
export default class CollectView extends Component {

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
        collectList(page - 1, this.props.cookie)
            .then((list) => {
                console.log(list);
                console.log(list.data);

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

    renderData() {
        return (
            <UltimateListView
                ref={ref => this.listView = ref}
                onFetch={this.fetchData.bind(this)}
                keyExtractor={(item, index) => `${index} - ${item}`}
                allLoadedText={'没有更多数据了'}
                waitingSpinnerText={''}
                item={this.renderItemView.bind(this)}
                separator={this.space.bind(this)}
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
            <CollectItemView item={item}/>
        );
    }

    space() {
        return <View style={{
            height: 0.5,
            backgroundColor: C9
        }}/>;
    }
}
