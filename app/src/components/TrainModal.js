import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';
import { Button, Item, Input } from 'native-base';
import { BlurView } from 'react-native-blur';
import shoppingModels from '../shoppingModels';

export default class TrainModal extends Component {
  render() {
    let modelKeys = Object.keys(shoppingModels.nouns);

    return (
      <Modal isVisible={this.props.modalVisibility} backdropOpacity={.80}>
        <View style={styles.modal} borderRadius={3}>
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
                      this.props.trainEinstein(this.props.sample, modelKey);
                      this.props.hideModal();
                    }}
                  >
                    <Text style={styles.buttonText}>
                      {shoppingModels.nouns[modelKey]}
                    </Text>
                  </Button>
                )
              })
            }
            <Button block info onPress={this.props.hideModal} style={styles.button}>
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

const styles = StyleSheet.create({
  modal: {
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 12,
  },
  text: {
    fontFamily: 'Courier',
    fontSize: 18,
    textAlign: 'left',
    alignItems: 'center',
    color: '#FFFFFF',
    paddingBottom: 10,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    flex: 1,
    flexShrink: 0,
    flexBasis: '40%',
    margin: 3,
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: '#FFFFFF',
  },
  absolute: {
    position: 'absolute',
    top: 0, left: 0, bottom: 0, right: 0,
  },
});
