import React, {Component} from 'react';
import {Image, View} from 'react-native';
import {container, screenWidth} from "../../configs";

export default class PhotoView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: 400,
        }
    }

    componentWillMount(): void {
        Image.getSize(this.props.url, (width, height) => {
            this.setState({
                height: height / width * screenWidth,
            });
        })
    }

    componentDidMount(): void {

    }

    render() {
        return (
            <View style={container}>
                <Image source={{uri: this.props.url}}
                       style={{width: screenWidth, height: this.state.height}}/>
            </View>
        );
    }
}
