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

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Home from './components/Home';
import Einstein from './components/Einstein';
import Loading from './components/Loading';
import Results from './components/Results';
import CameraView from './components/CameraView';
import phrases from './einsteinPhrases';

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      // user: null,
      // token: null,
      // showHome: true,
      // loggedIn: false,
      // einsteinText: null,
      // einsteinResults: null,

      loading: false,
      query: '',
      
      // einsteinText: 'no text set',
      einsteinResults: {
        "photos": [
            {
               "label": "campandhike",
               "url": "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/21227558_494613014236106_3681810282990010368_n.jpg"
            },
            {
               "label": "campandhike",
               "url": "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/21224880_2358544487702994_4825951134982078464_n.jpg"
            },
            {
               "label": "campandhike",
               "url": "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/19050886_251722641899162_3319195467023122432_n.jpg"
            },
            {
               "url": "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/19122202_281792375617272_571626762316808192_n.jpg"
            },
            {
               "label": "campandhike",
               "url": "https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/18646386_446623515698621_2087497716677476352_n.jpg"
            }
         ],
         "categoryCount": {
            "campandhike": 4,
            "undefined": 1
         },
         "mostPopular": {
            "label": "campandhike",
            "count": 4
         }
      },
      showHome: false,
      loggedIn: true,
      token: '240954482.61ba2c7.63c617faf63940cfb532ad7f3879427a',
      user: {id: "240954482", username: "davidisturtle", profile_picture: "https://scontent.cdninstagram.com/t51.2885-19/s150x150/11296795_485223351641943_1257523564_a.jpg", full_name: "David Oh", bio: "🍞🍇"},
    }
  }

  componentWillMount() {
    this.setTokenListener();
    this.setEinsteinResponse();
  }

  showHome() {
    this.setState({
      showHome: true
    }, () => this.setEinsteinResponse());
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
      .then(data => {
        return data;
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

  // fetchPhotos(userId) {
  //   return fetch(`https://api.instagram.com/v1/users/${userId}/media/recent/?access_token=${this.state.token}`)
  //     .then(response => response.json())
  //     .catch(error => console.log('fetching photos error: ', error));
  // }

  fetchUserData(username) {
    return fetch(`https://www.instagram.com/${username}/?__a=1`)
      .then(res => res.json())
      .then(data => {
        console.log('fetch user json', data)
        return data.user;
      })
      .catch(error => console.log('fetching user id error: ', error));
  }

  setTokenListener() {
    Linking.addEventListener('url', event => {
      var url = new URL(event.url);
      const token = url.searchParams.get('token');

      this.fetchUserInfo(token)
        .then(results => {
          console.log('set token results', results)
          this.setState({
            token: token,
            loggedIn: true,
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
      let url = data[i].display_src;
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
      loading: true
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
          showHome: false,
          loading: false
        }, () => this.setEinsteinResponse());
      })
      .catch(error => console.log('shopping for error: ', error));
  }

  einsteinPredict(url) {
    let formData = new FormData();
    formData.append('sampleLocation', url)
    formData.append('numResults', 1)
    formData.append('modelId', '5QGJG2X4DQB7AXGA47B3VSXDAE') // models for REI + Global categories 
    // for general image, modelId is 'GeneralImageClassifier'
    
    return fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer 09f74b4d440fa6e5715aac39925e3c5d96b5a278',
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
    const { user, loggedIn, showHome, loading, einsteinResults } = this.state;
    let text;

    if (!loggedIn) {
      text = phrases.login;
    } else if (loading) {
      if (username === 'self') {
        username = user.username;
      }
      text = phrases.loading(username);
    } else {
      if (showHome) {
        text = phrases.home(user.full_name.split(' ')[0]);
      } else {
        text = phrases.results(einsteinResults.mostPopular.label);
      }
    }
    
    this.setState({
      einsteinText: text
    });
  }

  render() {
    const { user, query, loggedIn, showHome, loading, einsteinResults, einsteinText } = this.state;

    return (
      <KeyboardAvoidingView 
        behavior='padding'
        style={styles.container}
      >
        <Header/>
        <Einstein
          loggedIn={loggedIn}
          showHome={loggedIn}
          einsteinText={einsteinText}
          einsteinResults={einsteinResults}
        />
        
        <View style={styles.body}>
          {!loggedIn
            ? <Login authenticate={this.authenticate.bind(this)}/> 
            : loading
            ? <Loading />
            : showHome 
            ? <Home 
                user={user}
                query={query}
                shopFor={this.shopFor.bind(this)}
                updateQuery={this.updateQuery.bind(this)}
              /> 
            : <Results
                showHome={this.showHome.bind(this)}
                einsteinResults={einsteinResults}
              />
          }
          {/*<CameraView captureData={this.captureData.bind(this)}/>*/}        
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
    backgroundColor: 'rgba(132, 91, 51, .8)',
  }
});

AppRegistry.registerComponent('blendedDates', () => App);
