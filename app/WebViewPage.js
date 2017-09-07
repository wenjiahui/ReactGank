import React from 'react'

import { View, Text } from 'react-native';
import { default_primary_color } from "./color_palette";

class WebViewPage extends React.Component {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title: navigation.state.params.info.desc,
    headerTintColor: 'white',
    headerStyle: { backgroundColor: default_primary_color }
  });

  render() {
    const { params } = this.props.navigation.state;
    const info = this.props.navigation.state.params.info;
    return (
      <View>
        <Text>{params.info.desc}</Text>
        <Text>{info.desc}</Text>
      </View>
    )
  }
}

export default WebViewPage;