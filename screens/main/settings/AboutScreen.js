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
let colorGetterFromProps = {};
let darkMode = false;
class AboutScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'About',
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
      <View style={[styles.container, {
        backgroundColor: this.props.color.diffrentBack
      }]}>
        <ScrollView style={[styles.container, { backgroundColor: this.props.color.white }]} contentContainerStyle={styles.contentContainer}>
          <List>
            <ListItem noIndent style={{ height: 50 }}>
              <Left>
                <Text>Terms of Agreement</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem noIndent style={{ height: 50 }}>
              <Left>
                <Text>Data Collection Policy</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>

            <ListItem noIndent style={{ height: 50 }}>
              <Left>
                <Text>Vision/Mission</Text>
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
)(AboutScreen);

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
