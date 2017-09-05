import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native';




export default class HeaderExample extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <StatusBar barStyle="light-content"/>
        </View>
        <View style={styles.header}>
          <Image
            source={require('../static/header.png')}
            style={styles.imageHeader}
          />
        </View>
      </View>
    )
  }

  // render() {
  //   return (
  //     <Container >
  //       <Header>
  //         <Left>

  //         </Left>
  //         <Body>
  //           <Title>Header</Title>
  //         </Body>
  //         <Right>

  //         </Right>
  //       </Header>
  //     </Container>
  //   );
  // }
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#000',

    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 0.5,
  },
  statusBar: {
    height: 18,
  },
  header: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

});