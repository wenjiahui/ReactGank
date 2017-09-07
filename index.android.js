/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StatusBar, StyleSheet, View, Navigator } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TabbedViewPager from 'react-native-tabbed-view-pager-android';
import {
  accent_color, dark_primary_color, default_primary_color, window_color
} from "./app/color_palette";
import MainPage from './app/MainPage';
import WebViewPage from "./app/WebViewPage";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: window_color
  },
  viewPager: {
    flex: 1
  },
});

export default class RootPage extends Component {

  static navigationOptions = {
    title: 'Gank',
    headerTintColor: 'white',
    headerStyle: { backgroundColor: default_primary_color }
  };

  constructor(props) {
    super(props)
    this.state = {
      tabNames: ['Android', 'iOS', '前端']
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={dark_primary_color}/>
        <TabbedViewPager
          tabMode={"fixed"}
          tabGravity={"center"}
          tabBackground={default_primary_color}
          tabIndicatorColor={accent_color}
          tabIndicatorHeight={4}
          tabTextColor={"#ffffffa0"}
          tabSelectedTextColor={"#ffffff"}
          tabElevation={4}
          tabNames={this.state.tabNames}
          style={styles.viewPager}
          initialPage={0}
          onPageSelected={(event) => this.onPageSelected(event.nativeEvent.position)}>
          {this.state.tabNames.map((tabName) => {
            return (
              <MainPage navigation={this.props.navigation} name={tabName} key={tabName}/>
            )
          })}
        </TabbedViewPager>
      </View>
    )
  };

  onPageSelected(position) {

  }
}

const SimpleApp = StackNavigator({
  Root: { screen: RootPage },
  MainPage: { screen: MainPage },
  WebView: { screen: WebViewPage },
});

AppRegistry.registerComponent('ReactGank', () => SimpleApp);
