import React, {Component, PureComponent} from "react";
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    Platform,
} from "react-native";
import {getCategoryData} from "../../http/api_gank";
import {Actions} from 'react-native-router-flux';
import {screenWidth} from "../../configs";
import WaitLoadingView from "../component/WaitLoadingView";
import ErrorView from "../component/ErrorView";
import {UltimateListView} from "react-native-ultimate-listview";

const RefreshableMode = Platform.select({ios: 'advanced', android: 'basic'})

export default class FuliView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            layout: "grid"
        };
    }

    //网络请求
    fetchData = (page = 1, startFetch, abortFetch) => {
        getCategoryData("福利", page)
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

    componentDidMount() {
        //请求数据
        this.fetchData();
    }

    renderData() {
        return (
            <UltimateListView
                ref={ref => this.listView = ref}
                key={this.state.layout}
                onFetch={this.fetchData.bind(this)}
                refreshableTitleRefreshing={'正在加载...'}
                refreshableTitleRelease={'释放刷新'}
                refreshableTitlePull={'下拉刷新'}
                waitingSpinnerText={''}
                dateTitle={'最近更新：'}
                displayDate
                keyExtractor={(item, index) => `${index} - ${item}`}
                refreshableMode={RefreshableMode}
                item={this.renderItemView.bind(this)}
                numColumns={2}
                maxToRenderPerBatch={6}
                updateCellsBatchingPeriod={100}
                getItemLayout={(data, index) => (
                    {length: screenWidth * 0.65, offset: screenWidth * 0.65 * index, index}
                )}
            />
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
            <RenderItemView item={item}/>
        );
    }
}

class RenderItemView extends PureComponent {

    render(): React.ReactNode {
        let w = screenWidth * 0.5 - 7;
        let h = screenWidth * 0.65 - 7;
        let style = styles.itemPadding;
        return (
            <TouchableHighlight
                key={this.props.item._id}
                style={style}
                underlayColor={'rgba(255,255,255,0.5)'}
                onPress={() =>
                    Actions.photo({"url": this.props.item.url, "title": this.props.item.desc})
                }>
                <Image
                    defaultSource={require('../../image/fuli.png')}
                    source={{uri: this.props.item.url}} style={{height: h, width: w}}
                    // 将图片降尺寸后再加载到内存中，就会减少很多内存开销
                    resizeMethod="resize"
                />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    itemPadding: {
        padding: 3.5,
        height: screenWidth * 0.65,
        width: screenWidth / 2,
    },
});
