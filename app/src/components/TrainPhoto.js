import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


import shoppingModels from '../shoppingModels';

export default class TrainPhoto extends Component {
  render() {
    let width;
    let uri = this.props.sample.thumbnail_src;
    if (this.props.sample.fromCamera) {
      uri = `data:image/gif;base64,${this.props.sample.data}`;
    }

    let label = this.props.sample.label;
    let displayLabel = shoppingModels.nouns[label]
    if (this.props.sample.isGeneralImage) {
      displayLabel = label;
    }

    return(
      <View style={[styles.container, { width: this.props.trainPhotowidth }]}>
        <Image
          source={{ uri: uri }}
          style={styles.photo}
          borderRadius={8}
        />
        <Text style={styles.text}>
          {displayLabel}
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
    resizeMode: 'cover'
  },
  text: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#FFFFFF'
  }
});