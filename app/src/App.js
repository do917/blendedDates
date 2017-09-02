import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import CameraView from './components/CameraView';
import Header from './components/Header';



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      events: null,
      imageData: 'no image data'
    }
  }

  captureData(data) {
    this.setState({
      imageData: data.path
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <CameraView captureData={this.captureData.bind(this)}/>
        <Text>
          {this.state.imageData}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('blendedDates', () => App);
