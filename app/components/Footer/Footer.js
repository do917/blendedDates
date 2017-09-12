import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import styles from './styles';
const imageFooter = require('./images/footer.png');

export default class Footer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={imageFooter}
          style={styles.footer}
        />
      </View>
    );
  }
}
