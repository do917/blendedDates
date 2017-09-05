import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import phrases from '../einsteinPhrases';

export default class Einstein extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image 
          source={require('../static/einstein.png')}
          resizeMode={'stretch'}
          style={styles.einstein}
        />
        <Text style={styles.text}>
          {this.props.einsteinText}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    paddingVertical: 10,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 1
  },
  einstein: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
  text: {
    paddingHorizontal: 10,
    fontFamily: 'Gill Sans',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    height: 60
  },
});