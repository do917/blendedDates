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

        <Button block info onPress={() => console.log('pressed')}>
          <Text style={styles.buttonText}>
            Train Einstein's image analysis
          </Text>
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white'
  },
});