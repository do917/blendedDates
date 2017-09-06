import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from 'native-base';


export default class Train extends Component {
  render() {
    return(
      <Text style={styles.container}>
        This is training
      </Text>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  }
});