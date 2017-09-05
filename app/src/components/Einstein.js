import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';

export default class Einstein extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image 
          source={require('../static/einstein.png')}
          resizeMode={'stretch'}
          style={styles.einstein}
        />
        <Text style={styles.text}>
          Hi {this.props.user.full_name}! How may I assist your shopping experience today?
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 3
  },
  einstein: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain'
  },
  text: {
    paddingHorizontal: 10,
    fontFamily: 'Gill Sans',
    fontSize: 20,
    textAlign: 'center',
  },
});