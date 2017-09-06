import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Linking,
  KeyboardAvoidingView
} from 'react-native';


import SafariView from 'react-native-safari-view';
import URL from 'url';

import Header from './components/Header';
import Einstein from './components/Einstein';
import Login from './components/Login';
import Home from './components/Home';
import Results from './components/Results';
import Train from './components/Train';
import Footer from './components/Footer';

import Loading from './components/Loading';
import CameraView from './components/CameraView';
import phrases from './einsteinPhrases';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      query: '',
      bodyStatus: 'login',
      einsteinText: phrases.login,
      einsteinResults: {
        photos: [],
        mostPopular: {
          label: ''
        }
      },
      // einsteinResults: {"photos":[{"label":"campandhike","url":"https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/21227558_494613014236106_3681810282990010368_n.jpg"},{"label":"campandhike","url":"https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/21224880_2358544487702994_4825951134982078464_n.jpg"},{"label":"cycle","url":"https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/19122202_281792375617272_571626762316808192_n.jpg"},{"label":"campandhike","url":"https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/s640x640/sh0.08/e35/18646386_446623515698621_2087497716677476352_n.jpg"},{"label":"campandhike","url":"https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/19050886_251722641899162_3319195467023122432_n.jpg"}],"categoryCount":{"campandhike":4,"cycle":1},"mostPopular":{"label":"campandhike","count":4}},
      // token: '240954482.61ba2c7.63c617faf63940cfb532ad7f3879427a',
      // user: {id: "240954482", username: "davidisturtle", profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/s150x150/11296795_485223351641943_1257523564_a.jpg", full_name: "David Oh", bio: "🍞🍇"},
    }
  }

  componentWillMount() {
    this.setTokenListener();
    this.fetchEinsteinToken();
  }

  showBody(which) {
    this.setState({
      bodyStatus: which
    }, () => this.setEinsteinResponse());
  }

  updateQuery(query) {
    this.setState({ query });
  }

  setTrainPhotoWidth(trainPhotowidth) {
    this.setState({ trainPhotowidth });
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

  fetchEinsteinToken() {
    fetch('http://10.0.1.2:3000/api/einstein/getToken')
      .then(res => res.json())
      .then(token => {
        this.setState({ 
          einsteinToken: token.token
        });
      })
      .catch(error => console.log('fetching einstein token error: ', error));
  }

  fetchUserInfo(token) {
    return fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log('fetching user info error: ', error));
  }

  fetchUserData(username) {
    return fetch(`https://www.instagram.com/${username}/?__a=1`)
      .then(res => res.json())
      .then(data => {
        console.log('fetch user json', data)
        return data.user;
      })
      .catch(error => console.log('fetching user id error: ', error));
  }

  // fetchUserFollowing(token) {
  //   return fetch(`https://api.instagram.com/v1/users/self/follows?access_token=${token}`)
  //     .then(res => res.json())
  //     .then(following => {
  //       return following;
  //     })
  //     .catch(error => console.log('fetching user info error: ', error));
  // } 

  // fetchPhotos(userId) {
  //   return fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
  //     .then(response => response.json())
  //     .catch(error => console.log('fetching photos error: ', error));
  // }

  setTokenListener() {
    Linking.addEventListener('url', event => {
      const token = event.url.split('token=')[1];

      this.fetchUserInfo(token)
        .then(results => {
          console.log('set token results', results)
          this.setState({
            instaToken: token,
            bodyStatus: 'home',
            user: results.data
          }, () => this.setEinsteinResponse());
          SafariView.dismiss();
        })
        .catch(error => console.log('setting token listener error: ', error));
    });
  }

  filterForRei(data) {
    let results = {
      photos: [],
      categoryCount: {},
      mostPopular: {
        label: null,
        count: 0
      }
    };
    let einsteinQueue = [];

    for (let i = 0; i < data.length; i++) {
      let url = data[i].thumbnail_src;
      einsteinQueue.push(this.einsteinPredict(url)
        .then(label => {
          let { categoryCount, mostPopular, photos } = results;
          let analyzedData = { label, url };
          
          if (label !== 'other') {
            photos.push(analyzedData);
            categoryCount[label] = categoryCount[label] + 1 || 1;
            if (categoryCount[label] > mostPopular.count) {
              mostPopular.count = categoryCount[label];
              mostPopular.label = label;
            }
          }
        })
        .catch(error => console.log('creating queue error: ', error))
      );
    }

    return Promise.all(einsteinQueue)
      .then(() => {
        console.log(JSON.stringify(results));
        return results;
      })
      .catch(error => console.log('queueing einstein calls error: ', error));
  }

  shopFor(username) {
    this.setState({
      bodyStatus: 'loading'
    }, () => this.setEinsteinResponse(username));
    

    this.fetchUserData(username)
      .then(userData => {
        console.log('this is userData', userData)
        return this.filterForRei(userData.media.nodes);
      })
      .then(data => {
        console.log('this is shopfor data', JSON.stringify(data))
        this.setState({
          einsteinResults: data,
          bodyStatus: 'results'
        }, () => this.setEinsteinResponse());
      })
      .catch(error => console.log('shopping for error: ', error));
  }

  einsteinPredict(url) {
    let formData = new FormData();
    formData.append('sampleLocation', url);
    formData.append('numResults', 1);
    formData.append('modelId', '5QGJG2X4DQB7AXGA47B3VSXDAE'); // models for REI + Global categories 
    // for general image, modelId is 'GeneralImageClassifier'
    
    return fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.state.einsteinToken}`,
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

  setEinsteinResponse(username) {
    const { user, einsteinResults, bodyStatus } = this.state;
    let firstName = user.full_name.split(' ')[0];
    let label = einsteinResults.mostPopular.label;

    const response = {
      login: phrases.login,
      home: phrases.home(firstName),
      loading: phrases.loading(username),
      results: phrases.results(label),
      train: phrases.train()
    };
    
    this.setState({
      einsteinText: response[bodyStatus]
    });
  }

  render() {
    const { bodyStatus, user, query, einsteinResults, einsteinText, setTrainPhotoWidth, trainPhotowidth } = this.state;
    const login = <Login 
                    authenticate={this.authenticate.bind(this)}
                  />;
    const home = <Home 
                  user={user}
                  query={query}
                  shopFor={this.shopFor.bind(this)}
                  updateQuery={this.updateQuery.bind(this)}
                />;
    const loading = <Loading/>;
    const results = <Results
                      showBody={this.showBody.bind(this)}
                      einsteinResults={einsteinResults}
                    />;
    const train = <Train
                    einsteinResults={einsteinResults}
                    trainPhotowidth={trainPhotowidth}
                    showBody={this.showBody.bind(this)}
                    setTrainPhotoWidth={this.setTrainPhotoWidth.bind(this)}
                  />;
    const bodies = { login, home, loading, results, train };


    return (
      <KeyboardAvoidingView 
        behavior='padding'
        style={styles.container}
      >
        <Header/>
        <Einstein
          einsteinText={einsteinText}
        />
        <View style={styles.body}>
          {bodies[bodyStatus]}
        </View>
        <Footer/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(132, 91, 51, .8)',
  }
});

AppRegistry.registerComponent('blendedDates', () => App);
