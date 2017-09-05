/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import MainPage from './app/MainPage';

export default class RootPage extends React.Component {
  render() {
    return <MainPage/>
  }
}

AppRegistry.registerComponent('ReactGank', () => RootPage);
