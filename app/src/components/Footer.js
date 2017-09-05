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
        <Text>
          THIS IS THE FOOTER
        </Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: '#8ab338',

    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 0.5,
  }
});