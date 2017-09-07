import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

import { Button } from 'native-base';
import TrainPhoto from './TrainPhoto';


export default class Train extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.photos} onLayout={e => this.props.setTrainPhotoWidth(e.nativeEvent.layout.height)}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.props.einsteinResults.samples.map((sample, i) => {
              return <TrainPhoto key={i} sample={sample} trainPhotowidth={this.props.trainPhotowidth}/>;
            })}
          </ScrollView>
        </View>
        
        <View style={styles.navigation}>
          <Button block info onPress={() => this.props.showBody('home')}>
            <Text style={styles.buttonText}>
              Go back to main page
            </Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderColor: 'blue',
    // borderWidth: 1,
    // borderStyle: 'solid'
  },
  photos: {
    flex: 2,
    flexDirection: 'row',
    
    // borderColor: 'green',
    // borderWidth: 1,
    // borderStyle: 'solid'
  },
  navigation: {
    flex: 1,
    justifyContent: 'flex-end',
    // borderColor: 'red',
    // borderWidth: 1,
    // borderStyle: 'solid'
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: 'white'
  }
});