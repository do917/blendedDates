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
          you have this many photos
          {this.props.einsteinResults.photos.length}

        </Text>
        <Text>
          this category is the most popular: 
          {this.props.einsteinResults.mostPopular.label + ',' + this.props.einsteinResults.mostPopular.count}
          
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