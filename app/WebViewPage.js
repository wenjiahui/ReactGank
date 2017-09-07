import React from 'react'

import {
  View, WebView, TouchableOpacity, Text, StyleSheet, Share, ProgressBarAndroid
} from 'react-native';
import { default_primary_color, window_color, accent_color } from "./color_palette";

class WebViewPage extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => {
    const { state } = navigation;
    const { renderHeaderRight } = state.params;
    return {
      title: navigation.state.params.info.desc,
      headerTintColor: 'white',
      headerStyle: { backgroundColor: default_primary_color },
      headerRight: renderHeaderRight && renderHeaderRight()
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ clickShare: this._onShare })
    this.props.navigation.setParams({
      renderHeaderRight: () => (
        <TouchableOpacity onPress={this._onShare.bind(this)}>
          <Text style={{
            color: 'white',
            paddingRight: 10,
            fontSize: 15
          }}>分享</Text>
        </TouchableOpacity>)
    });
  }

  _onShare() {
    const { params } = this.props.navigation.state;
    const info = params.info;

    Share.share({
      title: info.desc,
      message: '我在浏览文章《' + info.desc + "》,你也快来看看吧。" + info.url
    }).then(response => {

    })
  }

  render() {
    const { params } = this.props.navigation.state;
    const info = params.info;

    let progressBar;
    if (this.state.loading) {
      progressBar = (
        <ProgressBarAndroid color={accent_color}
                            indeterminate={true}
                            styleAttr="Horizontal"
                            style={styles.progress}/>
      )
    }

    return (
      <View style={styles.content}>
        <WebView style={styles.web}
                 javaScriptEnabled={true}
                 domStorageEnabled={true}
                 decelerationRate="normal"
                 source={{ uri: info.url }}
                 onLoadEnd={() => {
                   this.setState({
                     loading: false
                   })
                 }}
        />
        {progressBar}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: window_color
  },
  web: {
    flex: 1,
  },
  progress: {
    height: 20
  }
});

export default WebViewPage;