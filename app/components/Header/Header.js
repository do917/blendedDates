import React, { Component } from 'react';
import {
  View,
  Image,
  StatusBar,
} from 'react-native';
import styles from './styles';

const imageHeader = require('./images/header.png');

export default class Header extends Component {
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
