import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking
} from 'react-native';


import SafariView from 'react-native-safari-view';

import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import CameraView from './components/CameraView';



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      events: null,
      imageData: 'no image dat',
      loggedIn: true,
      loading: false,
      token: '240954482.61ba2c7.63c617faf63940cfb532ad7f3879427a'
    }
  }

  componentDidMount() {
    Linking.addEventListener('url', (event) => {
      var url = new URL(event.url);
      const code = url.searchParams.get("token");
      const error = url.searchParams.get("error");

      if (code) {
        this.setState({
          loggedIn: true,
          token: code
        });
      }
      
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

  // retreiveRecentPictures(userId) {
  //   fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
  //     .then(response => response.json())
  //     .then(results => {
  //       return results.data.map(result => {
  //         return result.images.standard_resolution.url;
  //       });
  //     });
  // }

  retreiveReiRelated(userId) {
    fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
      .then(response => response.json())
      .then(results => {
        let recentPictures = results.data.map(result => {
          return result.images.standard_resolution.url;
        })

        console.log('recentPictures', recentPictures);
      })
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
        <Header/>
        
        {!this.state.loggedIn 
          ? <Login authenticate={this.authenticate.bind(this)}/> 
          : <Home retreiveReiRelated={this.retreiveReiRelated.bind(this)}/>
        }

        {/*<CameraView captureData={this.captureData.bind(this)}/>*/}        
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
  }
});

AppRegistry.registerComponent('blendedDates', () => App);
