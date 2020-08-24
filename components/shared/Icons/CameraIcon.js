import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';

export default class CameraIcon extends React.Component {
  render() {
    return (
      <Icon type="EvilIcons" name="trophy" style={{ color: this.props.focused ? Colors.backgroundColor : Colors.lightGrey }} />
    );
  }
}