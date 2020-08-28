import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import Colors from '../../../constants/Colors';
import { userSelector } from '../../../store/selectors/UserSelector';
import { connect } from 'react-redux';
import { Avatar } from 'react-native-paper';
import normalize from 'react-native-normalize';

class ProfileIcon extends React.Component {
  render() {
    return (
      this.props.user.avatar ? (
        <Avatar.Image size={normalize(30)} source={{ uri: this.props.user.avatar }} />
      ) : (
          <Icon type="Feather" name="user" style={{fontSize: normalize(30), color: this.props.focused ? Colors.backgroundColor : "#000" }} />
        )
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
  };
};

export default connect(
  mapStateToProps,
  null
)(ProfileIcon);