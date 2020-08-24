import React from 'react';
import * as Icon from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';
import HomeIcon from './shared/Icons/HomeIcon';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class TabBarIcon extends React.Component {
  static displayName = 'TabBarIcon';

  // static propTypes = {
  //   name: PropTypes.string.isRequired,
  //   focused: PropTypes.bool
  // };

  render() {
    return (
      // <Icon.Ionicons
      //   name={this.props.name}
      //   size={26}
      //   style={styles.icon}
      //   color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // />
      <TouchableOpacity>
        {this.props.children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
});