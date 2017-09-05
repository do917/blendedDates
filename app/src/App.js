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
      query: null,
      results: null,
      

      loggedIn: true,
      token: '240954482.61ba2c7.63c617faf63940cfb532ad7f3879427a',
      user: {id: "240954482", username: "davidisturtle", profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/s150x150/11296795_485223351641943_1257523564_a.jpg", full_name: "David Oh", bio: "🍞🍇"},
    }
  }

  componentDidMount() {
    this.setTokenListener();
  }

  returnHome() {
    this.setState({
      showHome: true
    });
  }
  updateQuery(text) {
    this.setState({
      query: text
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

  // fetchUserFollowing(token) {
  //   return fetch(`https://api.instagram.com/v1/users/self/follows?access_token=${token}`)
  //     .then(res => res.json())
  //     .then(following => {
  //       return following;
  //     })
  //     .catch(error => console.log('fetching user info error: ', error));
  // } 

  setTokenListener() {
    Linking.addEventListener('url', event => {
      var url = new URL(event.url);
      const token = url.searchParams.get('token');

      this.fetchUserInfo(token)
        .then(results => {
          console.log('results', results)
          this.setState({
            token: token,
            loggedIn: true,
            user: results.data
          });
          SafariView.dismiss();
        })
        .catch(error => console.log('setting token listener error: ', error));
    });
  }

  fetchUser(username) {
    return fetch(`https://www.instagram.com/${username}/?__a=1`)
      .then(res => res.json())
      .then(json => {
        console.log('json', json)
        return json.user;
      })
      .catch(error => console.log('fetching user id error: ', error));
  }

  // fetchPhotos(userId) {
  //   return fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
  //     .then(response => response.json())
  //     .catch(error => console.log('fetching photos error: ', error));
  // }

  filterForRei(data) {
    let reiRelatedPhotos = [];
    let einsteinQueue = [];

    for (let i = 0; i < data.length; i++) {
      let url = data[i].display_src
      einsteinQueue.push(this.einsteinPredict(url)
        .then(label => {
          let analyzedData = {
            label: label,
            url: url
          }
          if (label !== 'other') {
            reiRelatedPhotos.push(analyzedData);
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

  shopFor(username) {
    this.setState({
      loading: true
    });
    

    this.fetchUser(username)
      .then(userData => {
        return this.filterForRei(userData.media.nodes);
      })
      .then(filteredPhotos => {
        this.setState({
          photos: filteredPhotos,
          showHome: false,
          loading: false
        })
        console.log('photos', filteredPhotos)
      })
      .catch(error => console.log('shopping for error: ', error));
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
        'Authorization': 'Bearer 44c64cde3cb3638ce1b31ec7d60ca0121f8e0bac',
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



  render() {
    return (
      <View style={styles.container}>
        <Header/>
        
        {!this.state.loggedIn
          ? <Login authenticate={this.authenticate.bind(this)}/> 
          : this.state.loading 
          ? <Loading/> 
          : this.state.showHome
          ? <Home user={this.state.user} shopFor={this.shopFor.bind(this)} query={this.state.query} updateQuery={this.updateQuery.bind(this)}/> 
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
