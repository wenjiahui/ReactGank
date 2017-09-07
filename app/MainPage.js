import React from 'react';

import {
  ActivityIndicator, ListView, RefreshControl, StyleSheet, Text, View, TouchableNativeFeedback
} from 'react-native';
import { primary_text_dark_color, divider_color, secondary_text_color } from "./color_palette";
import { fetchGankCategoryList } from "./gankApi";

const styles = StyleSheet.create({
  content: {
    flex: 1
  },
  row: {
    color: primary_text_dark_color,
    fontSize: 15,
    marginBottom: 10
  },
  desc: {
    fontSize: 12,
    color: secondary_text_color
  },
  divider: {
    backgroundColor: divider_color,
    height: 1
  }
});

const ds = new ListView.DataSource({ rowHasChanged: (r1: r2) => r1 !== r2 });

class MainPage extends React.Component {

  _data = [];

  constructor(pros) {
    super(pros);

    this.state = {
      page: 1,
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
                  renderRow={this._renderRow.bind(this)}
                  renderFooter={this._renderFooter.bind(this)}
                  renderSeparator={(sectionId, rowId) => {
                    return <View key={rowId} style={styles.divider}/>
                  }}
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

    fetchGankCategoryList(this.props.name, 0)
      .then(responseJson => responseJson.results)
      .then(results => {
        this._data = this._data.concat(results);
        this.setState({
          refreshing: false,
          page: 1,
          dataSource: ds.cloneWithRows(this._data)
        })
      }, error => {
        this.setState({
          refreshing: false
        })
      });
  }

  _onLoadMore() {
    this.setState({
      loadMore: true
    })

    fetchGankCategoryList(this.props.name, this.state.page)
      .then(responseJson => responseJson.results)
      .then(results => {
        this._data = this._data.concat(results);
        this.setState({
          loadMore: false,
          page: this.state + 1,
          dataSource: ds.cloneWithRows(this._data)
        })
      }, error => {
        this.setState({
          refreshing: false
        })
      });
  }

  _renderRow(rowData) {
    return (
      <TouchableNativeFeedback onPress={this._onItemClick.bind(this, rowData)}>
        <View style={{ padding: 10 }}>
          <Text
            numberOfLines={2}
            fontWeight="bold"
            ellipsizeMode="tail"
            style={styles.row}>
            {rowData.desc}
          </Text>
          <View style={{
            flex: 1,
            flexDirection: 'row'
          }}>
            <Text style={[styles.desc, { marginRight: rowData.who ? 15 : 0 }]}>{rowData.who}</Text>
            <Text style={styles.desc}>{rowData.publishedAt
            && rowData.publishedAt.slice(0, 10)}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  }

  _renderFooter() {
    if (this.state.loadMore) {
      return <ActivityIndicator/>
    }
    return <Text/>
  }

  _onItemClick(rowData) {
    const { navigate } = this.props.navigation;
    navigate('WebView', { info: rowData })
  }
}

export default MainPage;