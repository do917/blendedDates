import React, { Component } from 'react';
import {
  Text,
  View,
  ImageBackground,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const imageBackground = require('./images/background.png');
const imageEinstein = require('./images/einstein.png');

export default class Einstein extends Component {
  static propTypes = {
    einsteinText: PropTypes.string,
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={imageBackground}
          style={styles.background}
        >
          <ImageBackground
            source={imageEinstein}
            style={styles.einstein}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text} adjustsFontSizeToFit={true}>
                {this.props.einsteinText}
              </Text>
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}

