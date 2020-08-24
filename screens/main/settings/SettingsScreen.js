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
import { getUserSettings, logout } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { List, ListItem, Left, Right, Icon, Switch, Button } from 'native-base';
import navigationService from "../../../services/NavigationService"
import { TouchableOpacity } from 'react-native-gesture-handler';
import normalize from "react-native-normalize";
let colorGetterFromProps = {};
let darkMode = false;
class SettingsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Settings',
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };
  state = {
    exampleOne: true,
    exampleTwo: false,
    logout: false,
  };
  componentDidMount() {
    this.reRender = this.props.navigation.addListener('willFocus', () => {
      this.props.getUserSettings()
    });
  }

  componentWillUnmount() {
    this.reRender;
  }

  _signOutAsync = async () => {
    this.props.logout();
  };
  handleSwitch(name, val) {
    this.setState({ [name]: val })
    // call API for update settings at backend
  }
  render() {
    const { user } = this.props.user;

    return (
      <View style={[styles.container, { backgroundColor: colorGetterFromProps.diffrentBack }]}>
        <ScrollView style={[styles.container, { backgroundColor: colorGetterFromProps.diffrentBack }]} contentContainerStyle={styles.contentContainer}>
          <List>
            <ListItem noIndent style={{ height: normalize(70) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Stop All Notifications</Text>
              </Left>
              <Right>
                <Switch value={this.state.exampleOne} onValueChange={(val) => this.handleSwitch("exampleOne", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.exampleOne ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(70) }}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Sponsored Challenge Alerts</Text>
              </Left>
              <Right>
                <Switch value={this.state.exampleTwo} onValueChange={(val) => this.handleSwitch("exampleTwo", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.exampleTwo ? "#000" : "#E74C4D"} />
              </Right>
            </ListItem>

            <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: colorGetterFromProps.boxColor, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("Notifications")} >
              <Left style={{ flexDirection: "column" }}>
                <Text style={{ color: "#A9A9A9" }}>Notifications</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Personalize your alerts</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 12 }}>Set notification alert, frequency and more</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: colorGetterFromProps.boxColor, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("Notifications")} onPress={() => navigationService.navigate("Privacy")}>
              <Left style={{ flexDirection: "column" }}>
                <Text style={{ color: "#A9A9A9" }}>Privacy</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Change app privacy settings</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 12 }}>View privacy policies, terms and condition and change data</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            {/* <ListItem noIndent style={{ height: 50 }} onPress={() => navigationService.navigate("Security")}>
              <Left>
                <Text>Security</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}

            {/* <ListItem noIndent style={{ height: 50 }} onPress={() => navigationService.navigate("Account")}>
              <Left>
                <Text>Account</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}

            {/* <ListItem noIndent style={{ height: 50 }} onPress={() => navigationService.navigate("SpotAds")} >
              <Left>
                <Text>Spot Ads</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}

            <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: colorGetterFromProps.boxColor, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("Notifications")} onPress={() => navigationService.navigate("Help")}>
              <Left style={{ flexDirection: "column" }}>
                <Text style={{ color: "#A9A9A9" }}>Help</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Get more help from SnapHunt</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 12 }}>Get help on anything you want 24/7</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: colorGetterFromProps.boxColor, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("Notifications")} onPress={() => navigationService.navigate("Account")}>
              <Left style={{ flexDirection: "column" }}>
                <Text style={{ color: "#A9A9A9" }}>Account</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Manage your profile</Text>
                <Text style={{ color: "#A9A9A9", fontSize: 12 }}>Change profile picture, name, website and other etc</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            {/* <ListItem noIndent style={{ height: 50 }} onPress={() => navigationService.navigate("AddCard")} >
              <Left>
                <Text>Payment Method</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem> */}
            <TouchableOpacity onPress={() => this._signOutAsync()} >
              <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: colorGetterFromProps.boxColor, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("Notifications")} onPress={() => navigationService.navigate("Privacy")}>
                <Left style={{ flexDirection: "column" }}>
                  <Text style={{ color: "#A9A9A9" }}>Logout</Text>
                  <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Tap To logout</Text>
                </Left>
                <Right>
                  <Switch value={this.state.logout} onValueChange={(val) => this.handleSwitch("logout", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.logout ? "#000" : "#E74C4D"} />
                </Right>
              </ListItem>
            </TouchableOpacity>
          </List>
        </ScrollView>
        <View style={{
          alignItems: "center", justifyContent: "flex-end"
        }}>
          <View style={{ flexDirection: "row", marginTop: normalize(30), paddingBottom: normalize(20) }}>
            <Button style={{ height: normalize(40), backgroundColor: colorGetterFromProps.violetXblue, width: normalize(120), marginRight: normalize(10), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: colorGetterFromProps.white }}>Cancle</Text>
            </Button>
            <Button style={{ height: normalize(40), backgroundColor: colorGetterFromProps.backgroundColor, width: normalize(120), marginLeft: normalize(10), justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: colorGetterFromProps.white }}>Save</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: userSelector(state),
    color: colorGetterFromProps = state.userReducer.Color,
    darkMode: darkMode = state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  getUserSettings,
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);

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
