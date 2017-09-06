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
          <Image
            source={require('../static/einstein.png')}
            style={styles.einstein}
          >
            <Text style={styles.text} adjustsFontSizeToFit={true}>
              {this.props.einsteinText}
            </Text>
          </Image>
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
  },
  einstein: {
    flex: 1,
    justifyContent: 'flex-end',
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
  text: {
    fontFamily: 'Gill Sans',
    height: 75,
    paddingVertical: 2,
    paddingHorizontal: 10,
    fontSize: 20,
    textAlign: 'left',
    textAlignVertical: 'center',
    
    color: '#FFFFFF',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
});