import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Button } from 'native-base';

var {height, width} = Dimensions.get('window');

export default class Home extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.einsteinContainer}>
          <Image 
            source={require('../static/einstein.png')}
            resizeMode={'stretch'}
            style={styles.einstein}
          />
          <Text style={styles.introText}>
            Hi {this.props.user.full_name}! How may I assist your shopping experience today?
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Button block info onPress={() => this.props.shopFor('self')} style={styles.button}>
            <Text style={styles.buttonText}>
              Shop for Me
            </Text>
          </Button>
          
          <Text>
            Or enter your Friend's Instagram Account Below
          </Text>
          
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    // backgroundColor: '#ddf6ff',

    // borderColor: 'yellow',
    // borderStyle: 'solid',
    // borderWidth: 1,
  },
  einsteinContainer: {
    height: width * .9,
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
  introText: {
    paddingHorizontal: 10,
    
    fontFamily: 'Gill Sans',
    fontSize: 20,
    // color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    padding: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 3
  },
  button: {
    // alignSelf: 'center',
    // height: 40,
    // color: '#319dde'
    // color: 'red'
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Gill Sans',
  }
});