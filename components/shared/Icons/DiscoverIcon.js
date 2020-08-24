import React from 'react';
import { Image } from 'react-native';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';

export default class DiscoverIcon extends React.Component {
  render() {
    return (
      <Icon type="FontAwesome5" name="list-ul" style={{ color: this.props.focused ? Colors.backgroundColor : Colors.lightGrey }} />
    );
  }
}