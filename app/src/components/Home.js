import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import { Button } from 'native-base';

export default class Home extends Component {
  render() {
    return(
      <View>
        <Button onPress={() => this.props.retreiveReiRelated('self')}>
          <Text>
            Shop for Me
          </Text>
        </Button>
        <Button>
          <Text>
            Shop for a Friend
          </Text>
        </Button>
        <Text>
          this is home component
        </Text>
      </View>
    )
  }
}