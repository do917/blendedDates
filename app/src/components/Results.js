import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SafariView from 'react-native-safari-view';
import { Button } from 'native-base';

export default class Results extends Component {
  takeShopping() {
    SafariView.show({
      url: 'https://www.google.com',
      fromBottom: true
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Button block info onPress={this.takeShopping}>
          <Text style={styles.buttonText}>
            Take me shopping at REI!
          </Text>
        </Button>

        <Button block info onPress={this.props.showHome}>
          <Text>
            Help me shop for another friend
          </Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-around',
    // padding: 10,
    // alignSelf: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderStyle: 'solid',
    borderWidth: 3
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white'
  },
});