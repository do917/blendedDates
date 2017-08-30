import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Events from './app/Events';

var MOCKED_EVENTS_DATA = [
  {
    from: '2017-08-31 22:00:00',
    to: '2017-09-01 03:00:00',
    eventTitle: 'Surface Tension 26: Nick Klein, Enrique, Genital Quartz',
    venue: 'F8 1192 Folsom',
    city: 'San Francisco',
    genres: ['techno', 'industrial', 'noise'],
    price: {
      standard: 20
    },
    ageLimit: 21
  },
  {
    from: '2017-09-01 20:00:00',
    to: null,
    eventTitle: 'Com Truise, Nosaj Thing w/Cleopold',
    venue: 'Harlow\'s Restaurant And Nightclub',
    city: 'San Francisco',
    genres: ['synthpop', 'downtempo', 'electro', 'IDM'],
    price: {
      standard: 20,
      pre: 18,
      preTime: null
    },
    ageLimit: 21
  },
  {
    from: '2017-09-01 20:00:00',
    to: '2017-09-02 02:00:00',
    eventTitle: 'Riddim Hours: Digitist, Sub Artillery, Cosmonaut, Nukez, Dare -b2b- Vatic, Triple F, Chix, Slghtr',
    venue: 'DNA Lounge',
    city: 'San Francisco',
    genres: ['dubstep'],
    price: {
      standard: 20,
      pre: 12,
      preTime: '23:00:00'
    },
    ageLimit: 18
  }
];

export default class blendedDates extends Component {
  constructor() {
    super()
    this.state = {
      events: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/*<Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>*/}
        <Events events={MOCKED_EVENTS_DATA}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('blendedDates', () => blendedDates);
