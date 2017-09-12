import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'native-base';
import { BlurView } from 'react-native-blur';
import shoppingModels from '../../shoppingModels';
import styles from './stylesModal';
import PropTypes from 'prop-types';

export default class TrainModal extends Component {
  static propTypes = {
    sample: PropTypes.object,
    hideModal: PropTypes.func,
    appViewRef: PropTypes.func,
    trainEinstein: PropTypes.func,
    modalVisibility: PropTypes.bool,
  }

  render() {
    const {
      sample,
      hideModal,
      appViewRef,
      trainEinstein,
      modalVisibility,
    } = this.props;
    const modelKeys = Object.keys(shoppingModels.nouns);

    return (
      <Modal
        isVisible={modalVisibility}
        backdropOpacity={0.8}
      >
        <View
          style={styles.modal}
          orderRadius={3}
        >
          <BlurView
            style={styles.absolute}
            viewRef={this.props.appViewRef}
            blurType='light'
            blurAmount={10}
          />
          <Text style={styles.text}>
            What should the correct REI label be?
          </Text>
          <View style={styles.options}>
            {
              modelKeys.map((modelKey, i) => {
                return (
                  <Button block info
                    key={i}
                    style={styles.button}
                    onPress={() => {
                      trainEinstein(sample, modelKey);
                      hideModal();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {shoppingModels.nouns[modelKey]}
                    </Text>
                  </Button>
                );
              })
            }
            <Button block info onPress={hideModal} style={styles.button}>
              <Text style={styles.buttonText}>
                Cancel
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

