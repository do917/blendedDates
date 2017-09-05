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
      <View style={styles.container}>
        <Text>
          you have this many photos
          {this.props.einsteinResults.photos.length}

        </Text>
        <Text>
          this category is the most popular: 
          {this.props.einsteinResults.mostPopular.label + ',' + this.props.einsteinResults.mostPopular.count}
          
        </Text>
        <Button onPress={this.props.showHome}>
          <Text>
            Click to go back to Home
          </Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    // padding: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 3
  }
});