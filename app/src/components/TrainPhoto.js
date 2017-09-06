import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
let width;

import shoppingModels from '../shoppingModels';

export default class TrainPhoto extends Component {
  render() {
    return(
      <View style={[styles.container, { width: this.props.trainPhotowidth }]}>
        <Image
          source={{ uri: this.props.photo.url }}
          style={styles.photo}
          borderRadius={8}
        />
        <Text style={styles.text}>
          {shoppingModels.nouns[this.props.photo.label]}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2
  },
  photo: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#FFFFFF'
  }
});