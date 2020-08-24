import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';

export default class HomeIcon extends React.Component {
  render() {
    return (
      <Icon type="AntDesign" name="home" style={{ color: this.props.focused ? Colors.backgroundColor : Colors.lightGrey }} />
    );
  }
}