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

import CameraView from './components/CameraView';
import Header from './components/Header';
import SafariView from 'react-native-safari-view';



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
    console.log('mounting listenr')
    Linking.addEventListener('url', (event) => {
      console.log('adding event listener for linking')
      //remove listener here as it makes sense rather than doing it in component
      // Linking.removeEventListener('url', handleUrl)
      var url = new URL(event.url);
      const code = url.searchParams.get("token");
      const error = url.searchParams.get("error");
      //perform error handling...

      console.log('GOT THE AUTH CODE', code)
      SafariView.dismiss();
    })
  }

  authenticate() {
    fetch('http://localhost:3000/authorize_user', {
      method: 'POST'
    })
      .then(res => res.json())
      .then(json => {
        SafariView.show({
          url: json.url,
          fromBottom: true
        });
      });
  }

  generalPredict(data) {
    let formData = new FormData();
    formData.append('sampleBase64Content', data)
    formData.append('modelId', 'GeneralImageClassifier')

    fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 9a2b2148e50387f8af2e78fe43c4710dc7ecd9ba',
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
        'Authorization': 'Bearer 9a2b2148e50387f8af2e78fe43c4710dc7ecd9ba',
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
      .catch((error) => {
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
        

        <CameraView captureData={this.captureData.bind(this)}/>
        <Button onPress={this.authenticate}>
          <Text>Click Me!</Text>
        </Button>
        <Text>
          {this.state.imageData}
        </Text>
        
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
