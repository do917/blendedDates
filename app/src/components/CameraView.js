import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Dimensions
} from 'react-native';

import Camera from 'react-native-camera';
var {height, width} = Dimensions.get('window');


export default class CameraView extends Component {

  render() {
    return(
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>
      </View>
    )
  }

  takePicture() {
    const options = {};
    console.log(this.camera)
    
    this.camera.capture({target: 'disk'})
      .then((data) => {
        this.props.captureData(data.data)
      })
      .catch(err => console.error(err));
  }
}



const styles = StyleSheet.create({
  container: {
    height: width
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});