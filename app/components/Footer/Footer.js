import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

const imageFooter = require('../../static/footer.png');

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

const styles = StyleSheet.create({
  container: {
    height: 25,
    backgroundColor: '#141414',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4,
  },
  footer: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});
