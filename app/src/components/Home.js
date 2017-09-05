import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions
} from 'react-native';

import { Button } from 'native-base';

var {height, width} = Dimensions.get('window');

export default class Home extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image style={styles.einstein}>
        </Image>
        <Text style={styles.introText}>
          Hi {this.props.user.full_name}! How may I help you? 
        </Text>
        <Button onPress={() => this.props.shopFor('self')}>
          <Text>
            Shop for Me
          </Text>
        </Button>
        <Button>
          <Text>
            Shop for a Friend
          </Text>
        </Button>
        <Text>
          this is home component
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 90,
    backgroundColor: 'red',

    borderColor: 'yellow',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  einstein: {
    height: width * .8,
    backgroundColor: 'purple'
  },
  introText: {
    height: width * .2,
    backgroundColor: 'blue'
  }
});