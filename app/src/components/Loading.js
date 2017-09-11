import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Spinner from 'react-native-spinkit';

export default class Loading extends Component {
  render() {
    let uri = this.props.scanning.thumbnail_src;
    if (this.props.scanning.fromCamera) {
      uri = `data:image/gif;base64,${this.props.scanning.data}`;
    }

    return (
      <View style={styles.container} >
        {/*<Animatable.Image  // ANIMATION LOADING, LIVE SCANNING FEATURE IN PROGRESS
          animation={'zoomIn'}
          easing={'ease-in'}
          duration={200}
          style={styles.image}
          source={{ uri: 'https://instagram.fsnc1-2.fna.fbcdn.net/t51.2885-15/e35/20987213_356930694738588_1168838296923537408_n.jpg'}}
        />*/}
        <Image
          style={styles.image}
          source={{ uri }}
        >
        </Image>
        <Spinner size={100} type={'Wave'} color={'#319dde'} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    alignSelf: 'stretch',
    resizeMode: 'contain',
  },
});
