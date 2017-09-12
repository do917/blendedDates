import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Button } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';
import TrainPhoto from './TrainPhoto';

export default class Train extends Component {
  static propTypes = {
    showBody: PropTypes.func,
    trainEinstein: PropTypes.func,
    einsteinResults: PropTypes.object,
    trainPhotowidth: PropTypes.number,
    setTrainPhotoWidth: PropTypes.func,
  }

  render() {
    const {
      showBody,
      trainEinstein,
      einsteinResults,
      trainPhotowidth,
      setTrainPhotoWidth,
    } = this.props;

    return (
      <View
        style={styles.container}
        ref={(train) => {
          this.appViewRef = train;
        }}
      >
        <View style={styles.photos}
              onLayout={e => setTrainPhotoWidth(e.nativeEvent.layout.height)}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {einsteinResults.samples.map((sample, i) =>
              <TrainPhoto
                key={i}
                sample={sample}
                appViewRef={this.appViewRef}
                trainEinstein={trainEinstein}
                trainPhotowidth={trainPhotowidth}
             />)
            }
          </ScrollView>
        </View>
        <View style={styles.navigation}>
          <Button block info onPress={() => showBody('results')}>
            <Text style={styles.buttonText}>
              Go back to results
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

