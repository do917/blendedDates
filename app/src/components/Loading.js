import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from 'native-base';
const Spinner = require('react-native-spinkit');

export default class Loading extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Spinner size={100} type={'Wave'} color={'#319dde'}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    
    justifyContent: 'center',
    alignItems: 'center'
  }
});