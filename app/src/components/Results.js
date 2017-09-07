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
            {label !== 'Other'
              ? 'Get ' + label + ' gear from REI'
              : 'See whats cool at REI!'
            }
          </Text>
        </Button>

        <Button block info onPress={() => this.props.showBody('train')}>
          <Text style={styles.buttonText}>
            See how Einstein did
          </Text>
        </Button>

        <Button block info onPress={() => this.props.showBody('home')}>
          <Text style={styles.buttonText}>
            Go back to main page
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