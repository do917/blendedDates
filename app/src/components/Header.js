import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
} from 'react-native';

const imageHeader = require('../static/header.png');

export default class HeaderExample extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View style={styles.header}>
          <Image
            source={imageHeader}
            style={styles.imageHeader}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#141414',
  },
  statusBar: {
    height: 18,
    backgroundColor: '#141414',
  },
  header: {
    flex: 1,
    alignItems: 'center',
  },
  imageHeader: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});
