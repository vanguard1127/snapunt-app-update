import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';

export default class ChallengeIcon extends React.Component {
  render() {
    return (
      <Image source={require("assets/images/camera.png")} style={{height: 30, width: 30}}/>
    );
  }
}