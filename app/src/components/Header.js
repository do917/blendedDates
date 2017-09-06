import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';




export default class HeaderExample extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../static/header.png')}
            style={styles.imageHeader}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#000',

    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  statusBar: {
    height: 18,
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
    resizeMode: 'contain'
  }
});