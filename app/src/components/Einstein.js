import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground
} from 'react-native';

import phrases from '../einsteinPhrases';

export default class Einstein extends Component {
  render() {
    return(
      <View style={styles.container}>
        <ImageBackground
          source={require('../static/background.png')}
          style={styles.background}
        >
          <ImageBackground
            source={require('../static/einstein.png')}
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2
  },
  background: {
    flex: 1,
    // padding: 10
  },
  einstein: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  textContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingVertical: 2,
    paddingHorizontal: 10
  },
  text: {
    fontFamily: 'Courier',
    height: 85,
    fontSize: 18,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#FFFFFF'
  },
  caret: {
    fontFamily: 'Courier',
    fontSize: 18,
    color: '#bff442'
  }
});