import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $t from '@i18n';
import { logout } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { List, ListItem, Left, Right, Icon, Switch } from 'native-base';
import * as Linking from 'expo-linking';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class Report extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Report',
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };

  render() {
    const { user } = this.props.user;

    return (
      <View style={[styles.container, { backgroundColor: this.props.color.white }]}>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state), color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Report);

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    // borderColor: "red",
    // borderWidth: 1,
  },
  container: {
    flex: 1,

  }
});
