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
import Loading from './components/Loading';
import Results from './components/Results';
import CameraView from './components/CameraView';



export default class App extends Component {
  constructor() {
    super()
    this.state = {
      // user: null,
      // token: null,
      // loggedIn: false,
      photos: [],
      loading: false,
      showHome: true,

      loggedIn: true,
      token: '240954482.61ba2c7.63c617faf63940cfb532ad7f3879427a',
      user: {id: "240954482", username: "davidisturtle", profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/s150x150/11296795_485223351641943_1257523564_a.jpg", full_name: "David Oh", bio: "🍞🍇"},
    }
  }

  componentDidMount() {
    this.setTokenListener() 
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
      .catch(error => console.log('authentication error: ', error));
  }

  fetchUserInfo(token) {
    return fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(res => res.json())
      .then(user => {
        return user;
      })
      .catch(error => console.log('fetching user info error: ', error));
  }

  setTokenListener() {
    Linking.addEventListener('url', event => {
      var url = new URL(event.url);
      const token = url.searchParams.get('token');
      
      this.fetchUserInfo(token)
        .then(user => {
          this.setState({
            user: user.data,
            loggedIn: true,
            token: token
          });
          SafariView.dismiss();
        })
        .catch(error => console.log('setting token listener error: ', error));
    });
  }


  fetchPhotos(userId) {
    return fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
      .then(response => response.json())
      .catch(error => console.log('fetching photos error: ', error));
  }

  filterForRei(data) {
    let reiRelatedPhotos = [];
    let einsteinQueue = [];

    for (let i = 0; i < data.length; i++) {
      let url = data[i].images.standard_resolution.url;
      einsteinQueue.push(this.einsteinPredict(url)
        .then(label => {
          if (label !== 'other') {
            reiRelatedPhotos.push(data[i]);
          }
        })
        .catch(error => console.log('creating queue error: ', error))
      );
    }

    return Promise.all(einsteinQueue)
      .then(() => {
        return reiRelatedPhotos;
      })
      .catch(error => console.log('queueing einstein calls error: ', error));
  }

  shopFor(userId) {
    this.setState({
      loading: true
    });

    this.fetchPhotos(userId)
      .then(results => {
        this.filterForRei(results.data)
          .then(filteredPhotos => {
            this.setState({
              photos: filteredPhotos,
              showHome: false,
              loading: false
            })
          })
          .catch(error => console.log('filtering error: ', error));
      })
      .catch(error => console.log('fetching recent photos error: ', error));
  }

  einsteinPredict(url) {
    let formData = new FormData();
    formData.append('sampleLocation', url)
    formData.append('numResults', 1)
    formData.append('modelId', '3G4636B2DHG5ID7JXDYFBIL7S4') // models for REI + Global categories 
    // for general image, modelId is 'GeneralImageClassifier'
    
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
        return json.probabilities[0].label;
      })
      .catch(error => console.error('einstein prediction error: ', error));
  }

  returnHome() {
    this.setState({
      showHome: true
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header/>
        
        {!this.state.loggedIn
          ? <Login authenticate={this.authenticate.bind(this)}/> 
          : this.state.loading 
          ? <Loading/> 
          : this.state.showHome
          ? <Home user={this.state.user} shopFor={this.shopFor.bind(this)}/> 
          : <Results photos={this.state.photos} returnHome={this.returnHome.bind(this)}/>
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
