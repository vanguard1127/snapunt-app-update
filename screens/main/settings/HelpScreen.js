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
class HelpScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Help',
      headerStyle: {
        backgroundColor: colorGetterFromProps.diffrentBack,
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
        height: normalize(80)
      },
    };
  };

  composeMail() {
    Linking.openURL('mailto: davychiu@snaphunt.ca')
  }

  render() {
    const { user } = this.props.user;

    return (
      <View style={[styles.container, { backgroundColor: this.props.color.white }]}>
        <ScrollView style={[styles.container, { backgroundColor: this.props.color.white }]} contentContainerStyle={styles.contentContainer}>
          <List>
            <ListItem noIndent style={{ height: normalize(50) }} onPress={() => this.composeMail()} >
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Report a Problem</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem noIndent style={{ height: normalize(50) }} onPress={() => this.props.navigation.navigate("Faq")} >
              <Left>
                <Text style={{ color: "#A9A9A9" }}>FAQ</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(50) }} onPress={() => this.props.navigation.navigate("Terms")}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Terms and Conditions</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ height: normalize(50) }} onPress={() => Linking.openURL('https://snaphunt.ca/privacy-policy/')}>
              <Left>
                <Text style={{ color: "#A9A9A9" }}>Privacy Policy</Text>
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
)(HelpScreen);

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
