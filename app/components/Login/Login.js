import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Login extends Component {
  static propTypes = {
    authenticate: PropTypes.func,
  }

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
