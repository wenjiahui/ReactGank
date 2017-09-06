import React from 'react';

import { ActivityIndicator, ListView, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { primary_text_dark_color, window_color } from "./color_palette";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: window_color,
  },
  row: {
    margin: 10,
    color: primary_text_dark_color,
    fontSize: 15
  }
});

const ds = new ListView.DataSource({ rowHasChanged: (r1: r2) => r1 !== r2 });

class MainPage extends React.Component {

  _data = [];

  constructor(pros) {
    super(pros);

    this.state = {
      refreshing: true,
      loadMore: false,
      dataSource: ds.cloneWithRows(this._data)
    }
  }

  componentDidMount() {
    this._onRefresh()
  }

  render() {
    return (
      <View style={styles.content}>
        <ListView enableEmptySections={true} refreshControl={(
          <RefreshControl refreshing={this.state.refreshing}
                          onRefresh={this._onRefresh.bind(this)}/>)}
                  dataSource={this.state.dataSource}
                  renderRow={this._renderRow}
                  renderFooter={this._renderFooter.bind(this)}
                  onEndReached={this._onLoadMore.bind(this)}
        >
        </ListView>
      </View>
    )
  }

  _onRefresh() {
    this.setState({
      refreshing: true
    })

    fetch('https://www.easy-mock.com/mock/5908a9a87a878d73716e7519/club/ba/activity/admin/apply/list_all')
      .then(response => response.json())
      .then(responseJson => responseJson.applys)
      .then(applies => {
        this._data = this._data.concat(applies);
        this.setState({
          refreshing: false,
          dataSource: ds.cloneWithRows(this._data)
        })
      });
  }

  _onLoadMore() {
    this.setState({
      loadMore: true
    })
    fetch('https://www.easy-mock.com/mock/5908a9a87a878d73716e7519/club/ba/activity/admin/apply/list_all')
      .then(response => response.json())
      .then(responseJson => responseJson.applys)
      .then(applies => {
        this._data = this._data.concat(applies);
        this.setState({
          loadMore: false,
          dataSource: ds.cloneWithRows(this._data)
        })
      });
  }

  _renderRow(rowData) {
    return (<Text style={styles.row}>
      {rowData.user.nick}
    </Text>)
  }

  _renderFooter() {
    if (this.state.loadMore) {
      return <ActivityIndicator/>
    }
    return <Text/>
  }
}

export default MainPage;