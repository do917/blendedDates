import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import TrainModal from './TrainModal';
import shoppingModels from '../../shoppingModels';

export default class TrainPhoto extends Component {
  state = {
    modalVisibility: false,
  };

  static propTypes = {
    sample: PropTypes.object,
    trainEinstein: PropTypes.func,
    trainPhotowidth: PropTypes.number,
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
        <View style={[styles.photoContainer, { width: trainPhotowidth }]}>
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
