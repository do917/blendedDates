import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Item, Input } from 'native-base';

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button block info onPress={() => this.props.shopFor(this.props.user.username)}>
          <Text style={styles.buttonText}>
            Shop for me
          </Text>
        </Button>

        <Button block info onPress={this.props.shopBasedOnPhoto}>
          <Text style={styles.buttonText}>
            Shop based on a photo
          </Text>
        </Button>

        <Item rounded >
          <Input
            style={styles.inputField}
            autoCapitalize='none'
            placeholder='Shop for a friend...'
            placeholderTextColor='#FFFFFF'
            onChangeText={text => this.props.updateQuery(text)}
            onSubmitEditing={() => {
              if (this.props.query !== '') {
                this.props.shopFor(this.props.query);
              }
            }}
          />
        </Item>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: '#FFFFFF',
  },
  inputField: {
    fontFamily: 'Gill Sans',
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    height: 40,
  },
});
