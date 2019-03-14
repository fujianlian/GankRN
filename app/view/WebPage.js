import React, {Component} from "react";
import {BackHandler} from "react-native";
import {WebView,} from "react-native-webview";
import {Actions} from 'react-native-router-flux';

export default class MyWeb extends Component {

    constructor(props) {
        super(props);
        this.state = {
            backAndroidHandler: false,
        };
        this.title = null;
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._handleBack.bind(this));
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._handleBack.bind(this))
    }

    render() {
        return (
            <WebView
                ref={(r) => {
                    this.webView = r;
                }}
                source={{uri: this.props.url}}
                javaScriptEnabled={true}
                useWebKit={true}
                onNavigationStateChange={this._onNavigationStateChange.bind(this)}
            />
        );
    }

    _onNavigationStateChange(navState) {
        let title = navState.title;

        if (this.title !== title) {
            this.title = title;
            Actions.refresh({title})
        }
        this.setState({
            backAndroidHandler: navState.canGoBack
        });
    }

    _handleBack() {
        if (this.state.backAndroidHandler) {
            this.webView.goBack();
            return true;
        } else {
            return false;
        }
    }

}
