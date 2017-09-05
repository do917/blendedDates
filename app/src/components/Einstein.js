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
    // const { loggedIn, showHome, einsteinResults } = this.props;
    // let text = 'a text not set'
    // console.log('aa', loggedIn, showHome, phrases.results)
    // if (loggedIn && !showHome) {
    //   text = phrases.results
    // }


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
    flex: 1,
    paddingVertical: 10,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 3
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
  },
});