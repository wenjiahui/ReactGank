/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, StatusBar, StyleSheet, ToolbarAndroid, View } from 'react-native';
import TabbedViewPager from 'react-native-tabbed-view-pager-android';
import {
  accent_color, dark_primary_color, default_primary_color, window_color
} from "./app/color_palette";
import MainPage from './app/MainPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: window_color
  },
  toolbar: {
    backgroundColor: default_primary_color,
    height: 56,
    alignSelf: 'stretch',
  },
  viewPager: {
    flex: 1
  },
});

export default class RootPage extends Component {

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
        <ToolbarAndroid style={styles.toolbar} titleColor={'white'} title='Gank'/>
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
              <MainPage name={tabName} key={tabName}/>
            )
          })}
        </TabbedViewPager>
      </View>
    )
  };

  onPageSelected(position) {

  }
}

AppRegistry.registerComponent('ReactGank', () => RootPage);
