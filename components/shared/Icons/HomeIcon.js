import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';
import normalize from 'react-native-normalize';

export default class HomeIcon extends React.Component {
  render() {
    return (
      <Icon type="AntDesign" name="home" style={{fontSize: normalize(30), color: this.props.focused ? Colors.backgroundColor : Colors.lightGrey }} />
    );
  }
}