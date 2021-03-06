import React, { Component } from 'react';
import {
  View,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Loading extends Component {
  static propTypes = {
    scanning: PropTypes.object,
  }

  render() {
    const { scanning } = this.props;
    let uri = scanning.thumbnail_src;
    if (scanning.fromCamera) {
      uri = `data:image/gif;base64,${scanning.data}`;
    }

    return (
      <View style={styles.container} >
        {/*
          <Animatable.Image  // ANIMATION LOADING, LIVE SCANNING FEATURE IN PROGRESS
            animation={'zoomIn'}
            easing={'ease-in'}
            duration={200}
            style={styles.image}
            source={{ uri: 'https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20987213_356930694738588_1168838296923537408_n.jpg'}}
          />
        */}
        <Image
          style={styles.image}
          source={{ uri }}
        >
        </Image>
        <Spinner size={100} type={'Wave'} color={'#319dde'} />
      </View>
    );
  }
}

