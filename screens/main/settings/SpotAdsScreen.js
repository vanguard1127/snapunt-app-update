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
class SpotAdsScreen extends React.Component {

  state = {
    auto_promote: this.props.userSettings.auto_promote,
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Spot Ads',
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
                <Text>Auto Promote Posts</Text>
              </Left>
              <Right>
                <Switch value={this.state.auto_promote} onValueChange={(val) => this.handleSwitch("auto_promote", val)} />
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
)(SpotAdsScreen);

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
