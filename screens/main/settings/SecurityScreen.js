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
import { updateNotificationSettings } from '../../../store/actions/UserActions';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class SecurityScreen extends React.Component {

  state = {
    save_login: this.props.userSettings.save_login,
  };


  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Security',
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };

  handleSwitch(name, val) {
    this.setState({ [name]: val })
    // call API for update settings at backend
    this.props.updateNotificationSettings({ [name]: val })
  }

  render() {
    const { user } = this.props.user;

    return (
      <View style={[styles.container, { backgroundColor: this.props.color.white }]}>
        <ScrollView style={[styles.container, { backgroundColor: this.props.color.white }]} contentContainerStyle={styles.contentContainer}>
          <List>
            <ListItem noIndent style={{ height: 50 }}>
              <Left>
                <Text>Save Login Info</Text>
              </Left>
              <Right>
                <Switch value={this.state.save_login} onValueChange={(val) => this.handleSwitch("save_login", val)} />
              </Right>
            </ListItem>

            <ListItem noIndent style={{ height: 50 }}>
              <Left>
                <Text>Reset Password</Text>
              </Left>
            </ListItem>
            <ListItem noIndent style={{ height: 50 }}>
              <Left>
                <Text>Clear Search History</Text>
              </Left>
            </ListItem>
          </List>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    userSettings: state.userReducer.userSettings,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  updateNotificationSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SecurityScreen);

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
