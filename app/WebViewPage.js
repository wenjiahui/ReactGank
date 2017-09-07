import React from 'react'

import { View, WebView, StyleSheet, ProgressBarAndroid } from 'react-native';
import { default_primary_color, window_color, accent_color } from "./color_palette";

class WebViewPage extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.info.desc,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: default_primary_color }
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
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