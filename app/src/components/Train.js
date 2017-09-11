import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Button } from 'native-base';
import TrainPhoto from './TrainPhoto';

export default class Train extends Component {
  render() {
    return (
      <View style={styles.container} ref={train => this.appViewRef = train}>
        <View style={styles.photos}
              onLayout={e => this.props.setTrainPhotoWidth(e.nativeEvent.layout.height)}
        >
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.props.einsteinResults.samples.map((sample, i) => {
              return <TrainPhoto
                       key={i}
                       sample={sample}
                       appViewRef={this.appViewRef}
                       trainEinstein={this.props.trainEinstein}
                       trainPhotowidth={this.props.trainPhotowidth}
                     />;
            })}
          </ScrollView>
        </View>
        <View style={styles.navigation}>
          <Button block info onPress={() => this.props.showBody('results')}>
            <Text style={styles.buttonText}>
              Go back to results
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photos: {
    flex: 2,
    flexDirection: 'row',
  },
  navigation: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white',
  },
});
