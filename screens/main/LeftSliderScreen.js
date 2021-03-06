import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import $t from '@i18n';
import { List } from 'react-native-paper';
import { logout } from '../../store/actions/UserActions';
import { connect } from 'react-redux';

class LeftSliderScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object
  };

  _signOutAsync = async () => {
    this.props.logout();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View>
        <TouchableOpacity onPress={() => this._signOutAsync()}>
          <List.Item
            title="Logout"
            titleStyle={{color: "black"}}
          />
        </TouchableOpacity>

          {/* <Button onPress={() => this.props.navigation.closeDrawer()} title="Close me" /> */}
          {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('ChangePassword')}>
            <Text>{$t('profile.changePassword.changePassword')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('EditProfile')}>
            <Text>{$t('profile.updateUser.updateProfile')}</Text>
          </TouchableOpacity> */}

        </View>
      </SafeAreaView>
    );
  }
}

const mapDispatchToProps = {
  logout
};

export default connect(
  null,
  mapDispatchToProps
)(LeftSliderScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
