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
    let formData = new FormData();
    formData.append('sampleBase64Content', data)
    formData.append('modelId', '5SYIIE2JSUADH522UB3SUODVEU')
    
    fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer bbad2c9c1e4830715146c6924fda366ca7ac59f5',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          imageData: JSON.stringify(json.probabilities)
        })
      })
      .catch((error) => {
        console.error(error);
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
