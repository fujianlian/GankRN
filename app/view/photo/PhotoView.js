import React, {Component} from 'react';
import {Image, StyleSheet, View} from 'react-native';

//屏幕信息
const dimensions = require('Dimensions');
//获取屏幕的宽度和高度
const {width, height} = dimensions.get('window');

export default class PhotoView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 400,
        }
    }

    componentWillMount(): void {
        Image.getSize(this.props.url, (widths, heights) => {
            this.setState({
                height: heights / widths * width,
            });
        })
    }

    componentDidMount(): void {

    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={{uri: this.props.url}}
                       style={{width: width, height: this.state.height }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
