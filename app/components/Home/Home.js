import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Button, Item, Input } from 'native-base';
import PropTypes from 'prop-types';
import styles from './styles';

export default class Home extends Component {
  static propTypes = {
    user: PropTypes.object,
    query: PropTypes.string,
    shopFor: PropTypes.func,
    shopBasedOnPhoto: PropTypes.func,
    updateQuery: PropTypes.func,
  }

  render() {
    const {
      user,
      query,
      shopFor,
      shopBasedOnPhoto,
      updateQuery,
    } = this.props;

    return (
      <View style={styles.container}>
        <Button block info onPress={() => shopFor(user.username)}>
          <Text style={styles.buttonText}>
            Shop for me
          </Text>
        </Button>

        <Button block info onPress={shopBasedOnPhoto}>
          <Text style={styles.buttonText}>
            Shop from snapping a photo
          </Text>
        </Button>

        <Item rounded>
          <Input
            style={styles.inputField}
            autoCapitalize={'none'}
            autoCorrect={false}
            returnKeyType={'search'}
            placeholder={'Shop for a friend...'}
            placeholderTextColor={'#FFFFFF'}
            onChangeText={text => updateQuery(text)}
            onSubmitEditing={() => {
              if (query !== '') {
                shopFor(query.split(' ').join(''));
              }
            }}
          />
        </Item>
      </View>
    );
  }
}
