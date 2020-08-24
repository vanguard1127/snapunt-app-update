import React from 'react';
import { Image } from 'react-native';

export default class CacheIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/images/cache.jpeg')}
        fadeDuration={0}
        style={{width: 23, height: 23, resizeMode: "contain"}}
      />
    );
  }
}