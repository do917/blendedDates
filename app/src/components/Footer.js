import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Footer extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image
          source={require('../static/footer.png')}
          style={styles.footer}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 25,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 4
  },
  footer: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
});