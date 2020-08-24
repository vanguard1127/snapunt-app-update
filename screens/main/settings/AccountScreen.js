import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $t from '@i18n';
import { logout } from '../../../store/actions/UserActions';
import { userSelector } from '../../../store/selectors/UserSelector';
import Colors from '../../../constants/Colors';
import { List, ListItem, Left, Right, Icon, Switch } from 'native-base';
import { updateNotificationSettings } from '../../../store/actions/UserActions';
import { TextButton, OutlineButton, DarkOutlineButton } from '../../../components/shared/Button/Button';
import normalize from "react-native-normalize";
import navigationService from "../../../services/NavigationService"
let colorGetterFromProps = {};
let darkMode = false;
const featureAlert = (handleSwitch) =>
  Alert.alert(
    "Featured Account",
    "If you are a public figure or company, you are eligible for featured account, once applied we will verify your identity via email or video chat if necessary.",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Apply", onPress: () => handleSwitch("featured", "pending") }
    ],
    { cancelable: false }
  );

class AccountScreen extends React.Component {

  state = {
    sync_contacts: this.props.userSettings.sync_contacts,
    featured: this.props.userSettings.featured,
    delete_account: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Account',
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };


  handleSwitch = (name, val) => {
    this.setState({ [name]: val })
    // call API for update settings at backend
    this.props.updateNotificationSettings({ [name]: val })
  }

  handleDelete = () => {
    this.setState({ delete_account: true });
  }

  render() {
    const { user } = this.props.user;

    return (
      <View style={[styles.container, { backgroundColor: this.props.color.white }]}>
        <ScrollView style={[styles.container, { backgroundColor: this.props.color.white }]} contentContainerStyle={styles.contentContainer}>
          <List>
            {/* <ListItem noIndent style={{ height: 50 }}>
             <Left>
               <Text style={{ color: "#A9A9A9" }}>Sync Contacts</Text>
              </Left>
              <Right>
              <Switch value={this.state.sync_contacts} onValueChange={(val) => this.handleSwitch("sync_contacts", val)}  />
              </Right>
            </ListItem> */}

            <ListItem noIndent style={{ height: normalize(50) }}>
              <Left style={{ flex: 1 }} >
                <Text style={{ color: "#A9A9A9" }}>Featured Accout</Text>
              </Left>
              <Right style={{ flex: 2 }} >
                {this.state.featured == "active" && <Text style={{ fontWeight: "bold" }} >Active</Text>}
                {this.state.featured == null && <TextButton style={{ color: this.props.color.link }} text={"Apply for featured account"} onPress={() => featureAlert(this.handleSwitch)} />}
                {this.state.featured == "pending" && <Text style={{ fontWeight: "bold" }} >Pending Request</Text>}
                {this.state.featured == "reject" && <Text style={{ fontWeight: "bold" }} >Request Rejected</Text>}
              </Right>
            </ListItem>
            <TouchableOpacity onPress={() => this.handleEdit()} >
              <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: this.props.color.white, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("EditProfile")} >
                <Left style={{ flexDirection: "column" }}>
                  <Text style={{ color: "#A9A9A9" }}>Edit Profile</Text>
                  <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Tap here to edit profile</Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" />
                </Right>
              </ListItem>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.handleDelete()} >
              <ListItem noIndent style={{ height: normalize(80), width: normalize(320), alignSelf: "center", borderBottomWidth: 0, backgroundColor: this.props.color.white, marginTop: normalize(10), borderRadius: 5 }} onPress={() => navigationService.navigate("Notifications")} onPress={() => navigationService.navigate("Privacy")}>
                <Left style={{ flexDirection: "column" }}>
                  <Text style={{ color: "#A9A9A9" }}>Delete</Text>
                  <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Tap To Delete</Text>
                  <Text style={{ color: "#A9A9A9", fontSize: 9 }}>Note: this action can't be undone</Text>
                </Left>
                <Right>
                  <Switch value={this.state.delete} onValueChange={(val) => this.handleSwitch("logout", val)} trackColor={{ true: 'white', false: '#ffe' }} thumbColor={this.state.delete ? "#000" : "#E74C4D"} />
                </Right>
              </ListItem>
            </TouchableOpacity>
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
)(AccountScreen);

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
