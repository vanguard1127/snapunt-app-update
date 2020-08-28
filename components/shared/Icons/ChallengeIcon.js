import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';
import normalize from 'react-native-normalize';

export default class ChallengeIcon extends React.Component {
  render() {
    return (
      <Image source={require("assets/images/camera.png")} style={{height: normalize(30), width: normalize(30)}}/>
    );
  }
}