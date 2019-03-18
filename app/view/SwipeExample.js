import React, {Component} from 'react'
import {
    Text,
    View,
    Image,
} from 'react-native'
import Swiper from 'react-native-swiper'
import {C3, mainColor, screenWidth} from "../configs";


const h = screenWidth * 0.52;
const styles = {
    container: {
        height: h,
        backgroundColor: C3
    },

    wrapper: {},

    slide: {
        height: h,
        justifyContent: 'center',
    },

    text: {
        color: '#fff',
        fontSize: 14,

    },

    image: {
        flex:1
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
    }


};

const titles = ['主页', '分类', '妹纸', '我的'];
const images = ['https://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png', 'https://www.wanandroid.com/blogimgs/acc23063-1884-4925-bdf8-0b0364a7243e.png',
    'https://www.wanandroid.com/blogimgs/50c115c2-cf6c-4802-aa7b-a4334de444cd.png', 'https://www.wanandroid.com/blogimgs/acc23063-1884-4925-bdf8-0b0364a7243e.png'];

export default class SwipeExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        }
    }

    render() {
        return (

            <View style={styles.container}>
                <Swiper
                    autoplay={true}
                    onMomentumScrollEnd={(e, state, context) => {
                        this.setState(
                            {index: state.index}
                        )
                    }}
                    dot={<View style={{
                        backgroundColor: 'rgba(0,0,0,.5)',
                        width: 5,
                        height: 5,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }}/>}
                    activeDot={<View style={{
                        backgroundColor: 'red',
                        width: 8,
                        height: 8,
                        borderRadius: 4,
                        marginLeft: 3,
                        marginRight: 3,
                        marginTop: 3,
                        marginBottom: 3
                    }}/>}
                    paginationStyle={{
                        bottom: 7, left: null, right: 10
                    }}>
                    {
                        titles.map((value, i) => this.renderItem(value, i))
                    }
                </Swiper>
                <View style={styles.views}>
                    <Text numberOfLines={1} style={styles.text}>{titles[this.state.index]}</Text>
                </View>
            </View>
        )
    }

    renderItem(value, i) {
        console.log(value + "==" + images[i]);
        return (<View style={styles.slide}>
            <Image resizeMode='stretch' style={styles.image}
                   source={{uri: images[i]}}/>
        </View>);
    }
}