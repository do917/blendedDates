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
          source={require('../static/background.png')}
          // resizeMode={'stretch'}
          style={styles.background}
        >
          <Image 
            source={require('../static/einstein.png')}
            style={styles.einstein}
          >
            <Text style={styles.text}
              adjustsFontSizeToFit={true}
              
            >
              {this.props.einsteinText}
            </Text>
          </Image>
        </Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 1
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    resizeMode: 'cover',
    width: undefined,
    height: undefined,
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