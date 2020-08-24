import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { passwordReset } from '../../store/actions/UserActions';
import { ResetPasswordForm } from '../../components/auth/ResetPasswordForm';
import { resetPasswordErrorSelector } from '../../store/selectors/ErrorSelector';
import Colors from '../../constants/Colors';
import { Card, Headline } from 'react-native-paper';
import normalize from "react-native-normalize";

class ResetPasswordScreen extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    passwordReset: PropTypes.func,
    resetPasswordError: PropTypes.string
  };

  handleSubmit = resetPasswordData => {
    this.props.passwordReset({
      ...resetPasswordData,
      email: this.props.navigation.getParam('email')
    });
  };

  render() {
    const { resetPasswordError, navigation } = this.props;
    const email = navigation.getParam("email")
    return (
      <KeyboardAwareScrollView enableOnAndroid behavior="padding"
        contentContainerStyle={styles.scorllViewContainer}
      >
        <View style={[styles.container, { backgroundColor: this.props.color.diffrentBack }]}>
          <Card style={[styles.loginCard, { backgroundColor: this.props.color.diffrentBack }]} elevation={0}>
            <View style={{

              justifyContent: 'center',
              flex: 1
            }}>
              <ResetPasswordForm email={email} onSubmit={this.handleSubmit} resetPasswordError={resetPasswordError} />
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetPasswordError: resetPasswordErrorSelector(state),
    color: state.userReducer.Color,
    darkMode: state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = { passwordReset };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  loginCard: {
    paddingBottom: normalize(20, "height"),
    flex: 1
  },
  scorllViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});
