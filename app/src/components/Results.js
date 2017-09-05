import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Button } from 'native-base';

export default class Results extends Component {
  render() {
    return(
      <View>
        <Text>
          this is results
          {JSON.stringify(this.props.photos)}
        </Text>
        <Button onPress={this.props.returnHome}>
          <Text>
            Click to go back to Home
          </Text>
        </Button>
      </View>
    )
  }
}