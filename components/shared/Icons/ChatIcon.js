import React from 'react';
import { Image } from 'react-native';
import normalize from 'react-native-normalize';

export default class ChatIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/images/chat.jpeg')}
        fadeDuration={0}
        style={{width: normalize(30), height: normalize(30), resizeMode: "contain"}}
      />
    );
  }
}