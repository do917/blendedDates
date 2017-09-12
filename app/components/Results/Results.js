import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';
import shoppingModels from '../../shoppingModels';

export default class Results extends Component {
  static propTypes = {
    einsteinResults: PropTypes.object,
    showBody: PropTypes.func,
  }

  takeShopping() {
    const { label } = this.props.einsteinResults.mostPopular;
    SafariView.show({
      url: shoppingModels.links[label],
      fromBottom: true,
    });
  }

  render() {
    let { label } = this.props.einsteinResults.mostPopular;
    label = shoppingModels.verbs[label];
    return (
      <View style={styles.container}>
        <Button block info onPress={this.takeShopping.bind(this)}>
          <Text style={styles.buttonText}>
            {label !== 'other'
              ? 'Get ' + label + ' gear from REI'
              : 'See what else is cool at REI!'
            }
          </Text>
        </Button>
        <Button block info onPress={() => this.props.showBody('train')}>
          <Text style={styles.buttonText}>
            See Einstein's analysis
          </Text>
        </Button>

        <Button block info onPress={() => this.props.showBody('home')}>
          <Text style={styles.buttonText}>
            Go back to main page
          </Text>
        </Button>
      </View>
    );
  }
}
