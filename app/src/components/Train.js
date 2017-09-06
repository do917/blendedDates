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
      <View style={styles.container}>
        <View style={styles.photos}>
          <Text>
            This is training
          </Text>
        </View>
        
        <View style={styles.navigation}>
          <Button block info onPress={this.props.showHome}>
            <Text style={styles.buttonText}>
              Go back to main page
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'blue',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  photos: {
    flex: 2,
    borderColor: 'green',
    borderWidth: 1,
    borderStyle: 'solid'
  },
  navigation: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid'
  }
});