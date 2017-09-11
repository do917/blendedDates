import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Linking,
  KeyboardAvoidingView,
} from 'react-native';
import SafariView from 'react-native-safari-view';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import Header from './components/Header';
import Einstein from './components/Einstein';
import Login from './components/Login';
import Home from './components/Home';
import Loading from './components/Loading';
import Results from './components/Results';
import Train from './components/Train';
import Footer from './components/Footer';
import phrases from './einsteinPhrases';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: { full_name: 'not logged in' },
      query: '',
      bodyStatus: 'login',
      einsteinResults: {
        samples: [],
        mostPopular: {
          label: 'other',
          count: 0,
        },
      },
      scanning: {},
      einsteinText: null,
      trainPhotowidth: null,
      setTrainPhotoWidth: null,
    };
  }

  componentWillMount() {
    this.setTokenListener();
    this.fetchEinsteinToken();
    this.setEinsteinResponse();
  }

  showBody(body) {
    this.setState({
      bodyStatus: body,
    }, () => this.setEinsteinResponse());
  }

  updateQuery(query) {
    this.setState({ query });
  }

  setTokenListener() {
    Linking.addEventListener('url', (event) => {
      const token = event.url.split('token=')[1];

      this.fetchUserInfo(token)
        .then((results) => {
          this.setState({
            instaToken: token,
            bodyStatus: 'home',
            user: results.data,
          }, () => this.setEinsteinResponse());
          SafariView.dismiss();
        })
        .catch(error => console.log('setting token listener error: ', error));
    });
  }

  setTrainPhotoWidth(trainPhotowidth) {
    this.setState({ trainPhotowidth });
  }

  setLoading(username) {
    this.setState({
      bodyStatus: 'loading',
      scanning: {},
    }, () => this.setEinsteinResponse(username));
  }

  setEinsteinResults(data) {
    this.setState({
      einsteinResults: data,
      bodyStatus: 'results',
    }, () => this.setEinsteinResponse());
  }

  setEinsteinResponse(username) {
    const { user, einsteinResults, bodyStatus } = this.state;
    const { label } = einsteinResults.mostPopular;
    const firstName = user.full_name.split(' ')[0];
    const responses = {
      login: phrases.login,
      home: phrases.home(firstName),
      loading: phrases.loading(username),
      results: phrases.results(label),
      train: phrases.train(),
      training: phrases.training(),
    };
    const response = responses[bodyStatus];
    const setCaretInt = () => {
      let set = true;
      const caret = {
        false: ' ',
        true: '_',
      };
      this.caretInterval = setInterval(() => {
        this.setState({
          einsteinText: response + caret[set],
        });
        set = !set;
      }, 300);
    };
    let counter = 0;

    clearInterval(this.caretInterval);
    clearInterval(this.typingInterval);
    this.typingInterval = setInterval(() => {
      this.setState({
        einsteinText: response.slice(0, counter),
      });
      counter += 1;
      if (counter > response.length) {
        clearInterval(this.typingInterval);
        setCaretInt();
      }
    }, 25);
  }

  authenticate() {
    fetch('https://floating-everglades-83969.herokuapp.com/api/auth', { method: 'POST' })
      .then(res => res.json())
      .then((json) => {
        SafariView.show({
          url: json.url,
          fromBottom: true,
        });
      })
      .catch(error => console.log('authentication error: ', error));
  }

  fetchEinsteinToken() {
    fetch('https://floating-everglades-83969.herokuapp.com/api/einstein/getToken')
      .then(res => res.json())
      .then((data) => {
        this.setState({
          einsteinToken: data.token,
        });
      })
      .catch(error => console.log('fetching einstein token error: ', error));
  }

  fetchUserInfo(token) {
    return fetch(`https://api.instagram.com/v1/users/self/?access_token=${token}`)
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.log('fetching user info error: ', error));
  }

  fetchUserData(username) {
    return fetch(`https://www.instagram.com/${username}/?__a=1`)
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.log('fetching user id error: ', error));
  }

  einsteinPredict(sample) {
    const formData = new FormData();
    formData.append('numResults', 1);

    if (!sample.isGeneralImage) {
      // test against REI models:
      formData.append('modelId', 'DE6BIURXD7STLKA3S5LGGRFZ4Q');
    } else {
      // test against Salesforce's general image models:
      formData.append('modelId', 'GeneralImageClassifier');
    }

    if (sample.fromCamera) {
      formData.append('sampleBase64Content', sample.data);
    } else {
      formData.append('sampleLocation', sample.display_src);
    }

    this.setState({
      scanning: sample
    });

    return fetch('https://api.einstein.ai/v2/vision/predict', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.einsteinToken}`,
        'Cache-Control': 'no-cache',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => data)
      .catch(error => console.error('einstein prediction error: ', error));
  }

  labelSamples(givenSamples) {
    const results = {
      samples: [],
      categoryCount: {},
      mostPopular: {
        label: 'other',
        count: 0,
      },
    };
    const { categoryCount, mostPopular, samples } = results;
    const einsteinQueue = [];
    const einsteinQueueGeneral = [];

    for (let i = 0; i < givenSamples.length; i++) {
      let sample = givenSamples[i];

      einsteinQueue.push(this.einsteinPredict(sample)
        .then((data) => {
          const { label } = data.probabilities[0];
          sample.label = label;

          if (label === 'other') {
            sample.isGeneralImage = true;
            // if an image doesn't match one of REI's model,
            // it will be queued again to be analyzed with Salesforce's GeneralImageClassifier
            einsteinQueueGeneral.push(this.einsteinPredict(sample)
              .then((generalData) => {
                sample.label = generalData.probabilities[0].label;
              }));
          } else {
            categoryCount[label] = categoryCount[label] + 1 || 1;
            if (categoryCount[label] > mostPopular.count) {
              mostPopular.count = categoryCount[label];
              mostPopular.label = label;
            }
          }
          samples.push(sample);
        })
        .catch(error => console.log('creating queue error: ', error)));
    }

    return Promise.all(einsteinQueue)
      .then(() => Promise.all(einsteinQueueGeneral))
      .then(() => results)
      .catch(error => console.log('queueing einstein calls error: ', error));
  }

  shopFor(username) {
    this.setLoading(username);
    this.fetchUserData(username)
      .then((data) => {
        this.setState({ query: '' });
        if (!data) {
          throw userInvalid;
          return;
        }
        return this.labelSamples(data.user.media.nodes);
      })
      .then(data => this.setEinsteinResults(data))
      .catch(userInvalid => this.showBody('home'))
      .catch(error => console.log('shopping for error: ', error));
  }

  shopBasedOnPhoto() {
    const options = {
      quality: 0, // set low to meet 5mb limitation of Einstein API
    };

    ImagePicker.launchCamera(options, (response) => {
      if (response.data) {
        this.setLoading();
        response.fromCamera = true;
        this.labelSamples([response])
          .then((data) => {
            this.setEinsteinResults(data);
          });
      }
    });
  }

  trainEinstein(sample, expectedLabel) {
    this.showBody('training');
    const einsteinFeedback = (body) => {
      return fetch('https://api.einstein.ai/v2/vision/feedback', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.state.einsteinToken}`,
          'Cache-Control': 'no-cache',
          'Content-Type': 'multipart/form-data',
        },
        body,
      })
        .then(res => res.json())
        .then(data => this.showBody('train'))
        .catch(error => console.error('einstein feedback error: ', error)); 
    }
    const formData = new FormData();
    formData.append('modelId', 'DE6BIURXD7STLKA3S5LGGRFZ4Q');
    formData.append('expectedLabel', expectedLabel);

    if (sample.fromCamera) {
      formData.append('data', {
        uri: sample.uri,
        type: 'image/jpeg',
        name: 'sample.jpg',
      });
      return einsteinFeedback(formData);
    } else {
      const photoTempDirectory = RNFS.TemporaryDirectoryPath + 'trainingphoto.jpg';
      const options = {
        fromUrl: sample.display_src,
        toFile: photoTempDirectory,
      };
      return RNFS.downloadFile(options).promise
        .then((result) => {
          formData.append('data', {
            uri: photoTempDirectory,
            type: 'image/jpeg',
            name: 'sample.jpg',
          });
          return einsteinFeedback(formData);
        })
        .catch(error => console.log('downloading file error', error));
    } 
  }

  render() {
    const {
      user,
      query,
      scanning,
      bodyStatus,
      einsteinText,
      trainPhotowidth,
      einsteinResults,
    } = this.state;

    const login = <Login
                    authenticate={this.authenticate.bind(this)}
                  />;
    const home = <Home
                  user={user}
                  query={query}
                  shopFor={this.shopFor.bind(this)}
                  updateQuery={this.updateQuery.bind(this)}
                  shopBasedOnPhoto={this.shopBasedOnPhoto.bind(this)}
                 />;
    const loading = <Loading scanning={scanning}/>;
    const results = <Results
                      showBody={this.showBody.bind(this)}
                      einsteinResults={einsteinResults}
                    />;
    const train = <Train
                    einsteinResults={einsteinResults}
                    trainPhotowidth={trainPhotowidth}
                    showBody={this.showBody.bind(this)}
                    trainEinstein={this.trainEinstein.bind(this)}
                    setTrainPhotoWidth={this.setTrainPhotoWidth.bind(this)}
                  />;
    const bodies = {
      login, home, loading, results, train,
    };

    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAvoidingView
          behavior='position'
          contentContainerStyle={styles.container}
          style={styles.container}
        >
        <Einstein
          einsteinText={einsteinText}
        />
        <View style={styles.body}>
          {bodies[bodyStatus]}
        </View>
        <Footer />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    padding: 10,
    backgroundColor: 'rgba(132, 91, 51, .8)',
  },
});

AppRegistry.registerComponent('blendedDates', () => App);
