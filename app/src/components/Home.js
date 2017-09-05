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

import { Button, Item, Input } from 'native-base';

var {height, width} = Dimensions.get('window');

export default class Home extends Component {
  render() {
    return(
      <KeyboardAvoidingView
        style={styles.container}
        behavior='padding'
        keyboardVerticalOffset={10}
      >
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
          <Button block info onPress={() => this.props.shopFor(this.props.user.username)}>
            <Text style={styles.buttonText}>
              Shop for Me
            </Text>
          </Button>
          <Text style={styles.inputContainerText}>
            or
          </Text>
          {/*<Button block info onPress={() => this.props.shopFor('self')}>
            <Text style={styles.buttonText}>
              Shop for a Friend
            </Text>
          </Button>*/}
          <Item rounded>
            <Input style={styles.inputField} placeholder='Shop for a Friend...' onChangeText={text => this.props.updateQuery(text)} onSubmitEditing={() => this.props.shopFor(this.props.query)}/>
          </Item>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
  },
  einsteinContainer: {
    flex: 2,
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
    textAlign: 'center',
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderStyle: 'solid',
    borderWidth: 3
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white'
  },
  inputContainerText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    textAlign: 'center',
  },
  inputField: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    textAlign: 'center',
    height: 40
  }
});