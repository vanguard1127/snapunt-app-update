import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import $t from '@i18n';

import { verifyCode, resendCode } from '../../store/actions/UserActions';
import { VerificationForm } from '../../components/auth/VerificationForm';
import { verificationErrorSelector } from '../../store/selectors/ErrorSelector';
import { Card, Headline, Text } from 'react-native-paper';
import Color from "../../constants/Colors";
import normalize from "react-native-normalize";

class VerificationScreen extends React.Component {

  state = {
    codeText: "Resend Code?"
  }

  onSubmit = verificationData => {
    verificationData = { ...verificationData, ...{ forgotPassword: this.props.navigation.getParam("forgotPassword") } }
    this.props.verifyCode(verificationData);
  };

  resendCode = (verificationData) => {
    this.props.resendCode(verificationData)
    this.setState({ codeText: "Code sent!" })
  }

  render() {
    const { navigation } = this.props;
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

              <VerificationForm resendCode={this.resendCode} onSubmit={this.onSubmit} verificationError={this.props.verificationError} navigation={navigation} codeText={this.state.codeText} />
            </View>
          </Card>
        </View>
      </KeyboardAwareScrollView >
    );
  }
}

const mapStateToProps = state => {
  return {
    verificationError: verificationErrorSelector(state),
    color: state.userReducer.Color,
    darkMode: state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  verifyCode,
  resendCode
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VerificationScreen);

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
