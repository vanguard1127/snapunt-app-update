import React from 'react';
import { Image } from 'react-native';

export default class ChatIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/images/chat.jpeg')}
        fadeDuration={0}
        style={{width: 23, height: 23, resizeMode: "contain"}}
      />
    );
  }
}