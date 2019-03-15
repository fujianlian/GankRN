import React, {Component, PureComponent} from "react";
import {
    Image,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    DeviceEventEmitter,
    Platform,
} from "react-native";
import {getCategoryData} from "../../http/api_gank";
import {Actions} from 'react-native-router-flux';
import {mainColor, screenWidth} from "../../configs";
import {createAppContainer, createStackNavigator} from "react-navigation";
import WaitLoadingView from "../component/WaitLoadingView";
import ErrorView from "../component/ErrorView";
import {UltimateListView} from "react-native-ultimate-listview";

const RefreshableMode = Platform.select({ios: 'advanced', android: 'basic'})

class GirlsView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            //网络请求状态
            error: false,
            errorInfo: "",
            dataArray: [],
            column: 2,
            layout: "grid"
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
        let d = this.state.column === 2 ? 'grid' : 'list';
        this.setState({
            column: c,
            layout: d,
        });
    }

    //网络请求
    fetchData = (page = 1, startFetch, abortFetch) => {
        getCategoryData("福利", page)
            .then((list) => {
                let dataBlob = [];
                if (page === 1) {
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
                });
                console.log(dataBlob);
                dataBlob = null;
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
                refreshableTitleRefreshing={'正在加载...'}
                key={this.state.layout}
                onFetch={this.fetchData.bind(this)}
                keyExtractor={(item, index) => `${index} - ${item}`}
                refreshableMode={RefreshableMode}
                item={this.renderItemView.bind(this)}
                numColumns={this.state.column}
                maxToRenderPerBatch={this.state.column === 2 ? 3 : 6}
                updateCellsBatchingPeriod={100}
                getItemLayout={(data, index) => (
                    this.state.column === 2
                        ? {length: screenWidth * 0.60, offset: screenWidth * 0.60 * index, index}
                        : {length: screenWidth * 0.8, offset: screenWidth * 0.8 * index, index}
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
            <RenderItemView column={this.state.column} item={item}/>
        );
    }
}

class RenderItemView extends PureComponent {

    render(): React.ReactNode {
        let isDouble = this.props.column === 2;
        let w = isDouble ? screenWidth * 0.5 - 7 : screenWidth - 7;
        let h = isDouble ? screenWidth * 0.60 - 7 : screenWidth * 0.8 - 7;
        let style = isDouble ? styles.itemPadding : styles.itemPadding1;
        return (
            <TouchableHighlight
                style={style}
                underlayColor='transparent'
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