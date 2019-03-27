import React, {Component} from "react";
import {Platform, Image, Text, TouchableWithoutFeedback, View} from "react-native";
import {C10, C2, C9, mainColor, screenWidth} from "../../configs";

import {getQQBanner} from "../../http/api_wan_android";
import {getToday} from "../../http/api_gank";
import Swiper from 'react-native-swiper'
import {Actions} from "react-native-router-flux";
import {UltimateListView} from 'react-native-ultimate-listview'
import DailyItemView from "./DailyItemView";

const h = Platform.select({'android': screenWidth * 0.4, "ios": screenWidth * 0.44});

// 每日推荐
export default class DailyView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            index: 0
        }
    }

    componentDidMount() {
        getQQBanner()
            .then((list) => {
                this.setState({
                    data: list.data.slider,
                });
            });
        this.fetchData()
    }

    fetchData = (page, startFetch, abortFetch) => {
        getToday().then((list) => {
            let category = list.category;
            let dataSource = [];
            category.map((value, i) => {
                dataSource[i] = list.results[category[i]][list.results[category[i]].length - 1];
            });
            startFetch(dataSource, category.length)
        }).catch(() => {
            abortFetch();
        });
    };

    render() {
        return (
            <UltimateListView
                header={this.header.bind(this)}
                onFetch={this.fetchData.bind(this)}
                keyExtractor={(item, index) => `${index} - ${item}`}
                refreshable={true}
                allLoadedText={'没有更多数据了'}
                waitingSpinnerText={'加载中...'}
                item={this.renderItemView.bind(this)}
                pagination={false}
                separator={this.space.bind(this)}
            />
        );
    }

    space() {
        return <View style={{
            height: 0.5,
            backgroundColor: C10
        }}/>;
    }

    header() {
        return (
            <View>
                {this._renderBanner()}
                {this._renderMiddle()}
            </View>
        )
    }

    renderItemView(item, index, separator) {
        return (
            <DailyItemView item={item}/>
        );
    }

    _renderBanner() {
        return (
            <View style={{height: h, backgroundColor: '#dfdfdf',}}>
                {this.state.data != null ?
                    <View style={{flex: 1}}>
                        <Swiper
                            autoplay={true}
                            onMomentumScrollEnd={(e, state, context) => {
                                this.setState(
                                    {index: state.index}
                                )
                            }}
                            dot={<View style={{
                                backgroundColor: 'rgba(255,255,255,.5)',
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            activeDot={<View style={{
                                backgroundColor: mainColor,
                                width: 8,
                                height: 8,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}/>}
                            paginationStyle={{bottom: 7,}}>
                            {this.state.data.map((value, i) => this.renderItem(value, i))}
                        </Swiper>
                    </View> : <Text/>}
            </View>);
    }

    renderItem(value, i) {
        return (
            <TouchableWithoutFeedback
                key={'index' + i}
                style={styles.slide}
                onPress={() => {
                    Actions.webView({"url": value.linkUrl});
                }}>
                <Image resizeMode='stretch' style={styles.image} source={{uri: value.picUrl}}/>
            </TouchableWithoutFeedback>
        );
    }

    _renderMiddle() {
        return (
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    marginTop: 15,
                    height: 52,
                    marginHorizontal: 10,
                }}>
                    {this._middleImage("https://gank.io/xiandu", "闲读", require('../../image/icon_fm.png'))}
                    {this._middleImage("https://github.com/trending", "每日推荐", require('../../image/icon_day.png'))}
                    {this._middleImage("https://www.wanandroid.com", "玩安卓", require('../../image/icon_music.png'))}
                    {this._middleImage("https://m.douban.com/movie/nowintheater?loc_id=108288", "热映榜", require('../../image/icon_rank.png'))}
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: "space-around",
                    marginTop: 8,
                    marginHorizontal: 10,
                }}>
                    <Text style={styles.middle_text}>{"干货闲读"}</Text>
                    <Text style={styles.middle_text}>{"每日推荐"}</Text>
                    <Text style={styles.middle_text}>{"玩安卓"}</Text>
                    <Text style={styles.middle_text}>{"热映榜"}</Text>
                </View>
                <View style={{height: 0.5, width: screenWidth, backgroundColor: C10, marginTop: 12}}/>
            </View>
        )
    }

    _middleImage(url, title, image) {
        return <TouchableWithoutFeedback onPress={() => {
            Actions.webView({"url": url, "title": title})
        }}>
            <Image style={{height: 52, width: 52}} source={image} resizeMode={'cover'}/>
        </TouchableWithoutFeedback>
    }
}

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
    },
    middle_text: {
        fontSize: 13,
        width: 52,
        color: C2,
        textAlign: "center"
    }
};
