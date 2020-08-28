import React from 'react';
import { Image } from 'react-native';
import normalize from 'react-native-normalize';

export default class CacheIcon extends React.Component {
  render() {
    return (
      <Image
        source={require('../../../assets/images/cache.jpeg')}
        fadeDuration={0}
        style={{width:normalize(30), height: normalize(30), resizeMode: "contain"}}
      />
    );
  }
}