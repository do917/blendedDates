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
      results: null,
      loggedIn: true,
      loading: false,
      photos: [],
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

  getRecentPics(userId) {
    return fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
      .then(response => response.json());
  }

  filterForRei(data) {
    let reiRelatedPics = [];
    let einsteinQueue = [];

    for (let i = 0; i < data.length; i++) {
      let url = data[i].images.standard_resolution.url;
      console.log('url', url)
      einsteinQueue.push(this.einsteinPredict(url)
        .then(label => {
          if (label !== 'other') {
            reiRelatedPics.push(data[i]);
          }
        })
      );
    }

    return Promise.all(einsteinQueue)
      .then(() => {
        return reiRelatedPics;
      });
  }

  shopFor(userId) {
    this.getRecentPics(userId)
      .then(results => {
        this.filterForRei(results.data)
          .then(filteredPics => {
            console.log('these are the filtered pics', filteredPics);
          })
          .catch(error => {
            console.log('error on filtering', error);
          });
      })
      .catch(error => {
        console.log('error on getting recent pics', error);
      });
  }

  generalPredict(data) {
    let formData = new FormData();
    formData.append('sampleBase64Content', data)
    formData.append('modelId', 'GeneralImageClassifier')

    fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 00ac379db0e480ba70ea01a4e6b80bceba237663',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(res => res.json())
      .catch((error) => {
        console.error(error);
      });
  }

  einsteinPredict(url) {
    let formData = new FormData();
    formData.append('sampleLocation', url)
    formData.append('numResults', 1)
    formData.append('modelId', '3G4636B2DHG5ID7JXDYFBIL7S4') // models for REI + Global categories 
    
    return fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer e2772a497aafaa0224e31f4deb7b843920aa19ea',
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data'
      },
      body: formData
    })
      .then(res => res.json())
      .then(json => {
        console.log('label', json.probabilities[0].label);
        return json.probabilities[0].label;
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
          : <Home shopFor={this.shopFor.bind(this)}/>
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
