import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';

const imageBackground = require('../../static/background.png');
const imageEinstein = require('../../static/einstein.png');

export default class Einstein extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imageBackground}
          style={styles.background}
        >
          <ImageBackground
            source={imageEinstein}
            style={styles.einstein}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text} adjustsFontSizeToFit={true}>
                {this.props.einsteinText}
              </Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
  },
  background: {
    flex: 1,
  },
  einstein: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 2,
    paddingHorizontal: 15,
  },
  text: {
    fontFamily: 'Courier',
    height: 85,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#FFFFFF',
  },
  caret: {
    fontFamily: 'Courier',
    fontSize: 18,
    color: '#bff442',
  },
});
