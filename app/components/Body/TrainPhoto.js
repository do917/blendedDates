import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import shoppingModels from '../../shoppingModels';
import TrainModal from './TrainModal';

export default class TrainPhoto extends Component {
  constructor() {
    super();
    this.state = {
      modalVisibility: false,
    };
  }

  showModal() {
    this.setState({
      modalVisibility: true,
    });
  }

  hideModal() {
    this.setState({
      modalVisibility: false,
    });
  }

  render() {
    const {
      sample,
      trainEinstein,
      trainPhotowidth,
    } = this.props;

    let uri = sample.thumbnail_src;
    if (sample.fromCamera) {
      uri = `data:image/gif;base64,${sample.data}`;
    }

    const { label } = sample;
    let displayLabel = shoppingModels.nouns[label];
    if (sample.isGeneralImage) {
      displayLabel = label.split(', ')[0].replace(/\b\w/g, l => l.toUpperCase());
    }

    return (
        <View style={[styles.container, { width: trainPhotowidth }]}>
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
          <TrainModal style={{ borderRadius: 10 }}
            sample={sample}
            trainEinstein={trainEinstein}
            hideModal={this.hideModal.bind(this)}
            modalVisibility={this.state.modalVisibility}
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
