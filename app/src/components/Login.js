import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { Button } from 'native-base';


export default class Login extends Component {

  render() {
    return(
      <View>
        <Button onPress={this.props.authenticate}>
          <Text>Login with Instagram</Text>
        </Button>
        <Text>
          this is login component
        </Text>
      </View>
    )
  }
}