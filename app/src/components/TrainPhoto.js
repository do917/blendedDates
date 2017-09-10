import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Modal from 'react-native-modal';
import shoppingModels from '../shoppingModels';
import TrainModal from './TrainModal';

export default class TrainPhoto extends Component {
  constructor() {
    super()
    this.state = {
      modalVisibility: false,
    };
  }

  showModal() {
    console.log('pressed image')
    this.setState({
      modalVisibility: true,
    });
  }

  hideModal() {
    console.log('pressed image2')
    this.setState({
      modalVisibility: false,
    });
  }

  render() {
    let uri = this.props.sample.thumbnail_src;
    if (this.props.sample.fromCamera) {
      uri = `data:image/gif;base64,${this.props.sample.data}`;
    }

    const { label } = this.props.sample;
    let displayLabel = shoppingModels.nouns[label];
    if (this.props.sample.isGeneralImage) {
      displayLabel = label.split(', ')[0].replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <View style={[styles.container, { width: this.props.trainPhotowidth }]}>
          <TouchableOpacity
            style={styles.touchable}
            activeOpacity={0.3}
            onPress={this.showModal.bind(this)}
          >
            <Image
              style={styles.photo}
              source={{ uri }}
            />
          </TouchableOpacity>
          <TrainModal style={{ borderRadius: 10}}
            modalVisibility={this.state.modalVisibility}
            hideModal={this.hideModal.bind(this)}
          />
          <Text style={styles.text}>
            {displayLabel}
          </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 2,
  },
  touchable: {
    flex: 1,
  },
  photo: {
    borderRadius: 4,
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});
