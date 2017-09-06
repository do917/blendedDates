import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';


export default class Footer extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          powered by
        </Text>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#FFFFFF'
  }
});