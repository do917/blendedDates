import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking
} from 'react-native';

import { Button } from 'native-base';
import SafariView from 'react-native-safari-view';

import Header from './components/Header';
import CameraView from './components/CameraView';
import Login from './components/Login';
import Home from './components/Home';



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      events: null,
      imageData: 'no image dat',
      loggedIn: false
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', (event) => {
      var url = new URL(event.url);
      const code = url.searchParams.get("token");
      const error = url.searchParams.get("error");

      console.log('GOT THE AUTH CODE', code)
      SafariView.dismiss();
    });
  }

  authenticate() {
    fetch('http://10.0.1.2:3000/authorize_user', { method: 'POST' })
      .then(res => res.json())
      .then(json => {
        SafariView.show({
          url: json.url,
          fromBottom: true
        });
      })
      .catch(error => {
        console.log('error in authentication', error);
      });
  }

  generalPredict(data) {
    let formData = new FormData();
    formData.append('sampleBase64Content', data)
    formData.append('modelId', 'GeneralImageClassifier')

    fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ee1b297d035cef8afbe1244fde3187839628b249',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          imageData: JSON.stringify(json.probabilities)
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  captureData(data) {
    let formData = new FormData();
    formData.append('sampleBase64Content', data)
    formData.append('modelId', '3G4636B2DHG5ID7JXDYFBIL7S4') // models for REI + Global categories 
    
    fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ee1b297d035cef8afbe1244fde3187839628b249',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        let probabilities = json.probabilities;
        let hasGeneral = false;

        for (let i = 0; i < probabilities.length; i++) {
          let probability = probabilities[i];
          if (probability.label === 'other' && probability.probability > 0.9) {
            hasGeneral = true;
            this.generalPredict(data)
          }
        }

        if (!hasGeneral) {
          this.setState({
            imageData: JSON.stringify(json.probabilities)
          })
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar
           barStyle="light-content"
          />
        </View>
        <Header/>
        
        {!this.state.loggedIn : <Login/> ? <Home/>}
        <Text>
          {this.state.loggedIn.toString()}
        </Text>

        {/*<CameraView captureData={this.captureData.bind(this)}/>*/}
        <Button onPress={this.authenticate}>
          <Text>Login with Instagram</Text>
        </Button>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'brown',
    borderStyle: 'solid',
    borderWidth: 1
  },
  statusBar: {
    backgroundColor: '#000',
    height: 18,
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1
  }
});

AppRegistry.registerComponent('blendedDates', () => App);
