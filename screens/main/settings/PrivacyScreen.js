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

class PrivacyScreen extends React.Component {

  state = {
    disable_commenting: this.props.userSettings.disable_commenting,
    private_account: this.props.userSettings.private_account,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Privacy',
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
            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Disable All Commenting</Text>
              </Left>
              <Right>
                <Switch value={this.state.disable_commenting} onValueChange={(val) => this.handleSwitch("disable_commenting", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.disable_commenting ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Private Account</Text>
              </Left>
              <Right>
                <Switch value={this.state.private_account} onValueChange={(val) => this.handleSwitch("private_account", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.private_account ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Blocked Accounts</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
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
)(PrivacyScreen);

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
