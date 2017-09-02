import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Event from './Event';

export default class Events extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.events.map((event, i) => {
          return <Event key={i} event={event}/>;
        })}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 400
  }
});