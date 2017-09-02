import React, { Component } from 'react';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';


export default class HeaderExample extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.header}>
          AgentValentine
        </Text>
      </View>
    )
  }

  /*render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container>
    );
  }*/
}

const styles = StyleSheet.create({
  container: {
    height: 85
  },
  header: {
    fontSize: 19,
    textAlign: 'center'
  }
});