import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'native-base';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button block info onPress={this.props.authenticate}>
          <Text style={styles.buttonText}>
            Login with Instagram
          </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white',
  },
});
