import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SafariView from 'react-native-safari-view';
import { Button } from 'native-base';
import shoppingModels from '../shoppingModels';


export default class Results extends Component {
  
  takeShopping() {
    let label = this.props.einsteinResults.mostPopular.label;
    SafariView.show({
      url: shoppingModels.links[label],
      fromBottom: true
    });
  }

  render() {
    let label = this.props.einsteinResults.mostPopular.label;
    label = shoppingModels.verbs[label]
    return(
      <View style={styles.container}>
        <Button block info onPress={this.takeShopping.bind(this)}>
          <Text style={styles.buttonText}>
            Get {label} gear from REI
          </Text>
        </Button>

        <Button block info onPress={this.props.showHome}>
          <Text style={styles.buttonText}>
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
    borderWidth: 1
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white'
  },
});