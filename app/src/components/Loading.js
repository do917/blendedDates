import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Button } from 'native-base';

export default class Loading extends Component {
  render() {
    return(
      <View>
        <Text>
          LOADING...
        </Text>
      </View>
    )
  }
}