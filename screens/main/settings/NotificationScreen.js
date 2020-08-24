import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { logout, updateNotificationSettings } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import { List, ListItem, Left, Right, Icon, Switch, Button } from 'native-base';
import normalize from "react-native-normalize";
import Colors from '../../../constants/Colors';
let colorGetterFromProps = {};
let darkMode = false;
class NotificationScreen extends React.Component {

  state = {
    stop_all: this.props.userSettings.stop_all,
    sponsored_alert: this.props.userSettings.sponsored_alert,
    followers_alert: this.props.userSettings.followers_alert
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Notifications',
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

    console.log(this.props.notificationSettingsSuccess)
    console.log(this.props.notificationSettingsError)

    const { user } = this.props.user;

    return (
      <View style={[styles.container, { backgroundColor: this.props.color.white }]}>
        <ScrollView style={[styles.container, { backgroundColor: this.props.color.white }]} contentContainerStyle={styles.contentContainer}>
          <List>
            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Stop All Notifications</Text>
              </Left>
              <Right>
                <Switch value={this.state.stop_all} onValueChange={(val) => this.handleSwitch("stop_all", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.stop_all ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Sponsored Challenge Alerts</Text>
              </Left>
              <Right>
                <Switch value={this.state.sponsored_alert} onValueChange={(val) => this.handleSwitch("sponsored_alert", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.sponsored_alert ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Follower Alerts</Text>
              </Left>
              <Right>
                <Switch value={this.state.followers_alert} onValueChange={(val) => this.handleSwitch("followers_alert", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.followers_alert ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>
          </List>
        </ScrollView>
        <View style={{
          alignItems: "center", justifyContent: "flex-end"
        }}>
          <View style={{ flexDirection: "row", marginTop: normalize(30), paddingBottom: normalize(20) }}>
            <Button style={{ height: normalize(40), backgroundColor: this.props.color.violetXblue, width: normalize(120), marginRight: normalize(10), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: this.props.color.white }}>Cancle</Text>
            </Button>
            <Button style={{ height: normalize(40), backgroundColor: this.props.color.backgroundColor, width: normalize(120), marginLeft: normalize(10), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: this.props.color.white }}>Save</Text>
            </Button>
          </View>
        </View >
      </View >
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    notificationSettingsError: state.errorReducer.notificationSettingsError,
    notificationSettingsSuccess: state.userReducer.notificationSettingsSuccess,
    userSettings: state.userReducer.userSettings,
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  logout,
  updateNotificationSettings
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationScreen);

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
