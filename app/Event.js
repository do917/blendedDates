import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Event extends Component {
  render() {
    const { event } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.basicInfo}>
          <Text style={styles.dateTime}>
            {/*event.from*/}
            Tue: Aug 29 10pm-2am
          </Text>

          <Text style={styles.title}>
            {event.eventTitle}
          </Text>

          <Text style={styles.venue}>
            {event.venue}
          </Text>
        </View>

        <View style={styles.details}>
          <Text style={styles.genres}>
            {event.genres[0]}
          </Text>

          <Text style={styles.priceAge}>
            {'$' + event.price.standard + '\n'}
            {'  ' + event.ageLimit}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  //parent
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignContent: 'space-between',
    paddingVertical: 5,
    borderColor: 'green',
    borderStyle: 'solid',
    borderWidth: 1
  },

  basicInfo: {
    // width: '75/%',
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'space-between',

    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 1
  },
  details: {
    // width: '25%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderColor: 'yellow',
    borderStyle: 'solid',
    borderWidth: 1
  },

  //child
  dateTime: {

    color: 'red',

  },
  title: {
    
  },
  venue: {
    
  },
  genres: {
    borderColor: 'brown',
    borderStyle: 'solid',
    borderWidth: 1
  },
  priceAge: {
    borderColor: 'gray',
    borderStyle: 'solid',
    borderWidth: 1
  }
});