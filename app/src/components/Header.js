import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';




export default class HeaderExample extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image
          source={require('../static/header.png')}
          style={styles.imageHeader}
        />
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#000',

    borderColor: 'blue',
    borderStyle: 'solid',
    borderWidth: 0.5,
  }
});