import React from 'react';
import { StyleSheet, View, Image, Text, Dimensions, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import $t from '@i18n';

import { login, facebookLogin, googleLogin, appleLogin } from '../../store/actions/UserActions';
import SignInForm from '../../components/auth/SignInForm';
import { SignUpForm } from '../../components/auth/SignUpForm';

import { signUp } from '../../store/actions/UserActions';
import { setSignUpErrors } from '../../store/actions/ErrorActions';
import { signUpErrorsSelector } from '../../store/selectors/ErrorSelector';
import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';
import { passwordForgot } from '../../store/actions/UserActions';
import { setForgotPasswordError } from '../../store/actions/ErrorActions';
import { forgotPasswordErrorSelector } from '../../store/selectors/ErrorSelector';

import { signInErrorSelector } from '../../store/selectors/ErrorSelector';
import { Avatar, Button, Card, Title, Headline } from 'react-native-paper';
import Color from "../../constants/Colors"
import { Logo } from '../../components/shared/Logo';
import Swiper from 'react-native-page-swiper'
import normalize from 'react-native-normalize';

class SignInScreen extends React.Component {
  static navigationOptions = {
    title: $t('auth.signIn')
  };

  static propTypes = {
    navigation: PropTypes.object,
    login: PropTypes.func,
    facebookLogin: PropTypes.func,
    googleLogin: PropTypes.func,
    signInError: PropTypes.bool,
    signUp: PropTypes.func,
    signUpErrors: PropTypes.object,
    setSignUpErrors: PropTypes.func,
    passwordForgot: PropTypes.func,
    forgotPasswordError: PropTypes.string,
    setForgotPasswordError: PropTypes.func,

  };

  handleSubmit = forgotPasswordData => {
    this.props.passwordForgot(forgotPasswordData);
  };

  signUp = signupData => {
    this.props.signUp(signupData);
  };

  onSubmit = signInData => {
    this.props.login(signInData);

  };

  clickSignUp = () => {
    let screen_width = Dimensions.get('window').width;
    this.scrollRef.scrollTo({ x: screen_width })

  };
  clickSignIn = () => {
    let screen_width = Dimensions.get('window').width;
    this.scrollRef.scrollTo({ x: 0 })
  };
  clickForgotPassword = () => {
    let screen_width = Dimensions.get('window').width;
    this.scrollRef.scrollTo({ x: screen_width * 2 })
  }
  // goToSignUp = () => {
  //   this.props.navigation.navigate('SignUp');
  // };

  // goToForgotPassword = () => {
  //   this.props.navigation.navigate('ForgotPassword');
  // };

  componentWillUnmount() {
    this.props.setSignUpErrors({});

  }
  render() {
    const { signInError, facebookLogin, googleLogin, appleLogin, signUpErrors, forgotPasswordError } = this.props;
    let scrollView_Width = Dimensions.get('window').width;
    let screen_width = Dimensions.get('window').width;
    let screen_height = Dimensions.get('window').height;
    return (
      <ImageBackground source={require('../../assets/images/background_first.png')} style={{ width: null, height: null, flex: 1, resizeMode: 'cover', alignSelf: 'stretch' }}>
        <KeyboardAvoidingView enableOnAndroid
          behavior="padding"
          sytle={styles.scrollViewContainer}
        >
          <Card style={styles.loginCard} elevation={0}>
            <Logo />
            <ScrollView
              horizontal={true}
              pagingEnabled={true}
              scrollEnabled={false}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              ref={node => this.scrollRef = node}
            >
              <View style={{
                width: scrollView_Width,
                justifyContent: 'center',
                flex: 1
              }}>
                <ScrollView scrollEnabled={true} vertical={true} overScrollMode="never" showsVerticalScrollIndicator={false}>
                  <SignInForm onSubmit={this.onSubmit} clickSignUp={this.clickSignUp} signInError={signInError} clickSignIn={this.clickSignIn} facebookLogin={facebookLogin} appleLogin={appleLogin} clickForgotPassword={this.clickForgotPassword} />
                </ScrollView>
              </View>

              <View style={{
                width: scrollView_Width,
                justifyContent: 'center',
                flex: 1,
                padding: normalize(20)
              }}>
                <ScrollView scrollEnabled={true} vertical={true} style={{flex: 1}} overScrollMode="never" showsVerticalScrollIndicator={false}>
                  <SignUpForm onSubmit={this.signUp} clickSignIn={this.clickSignIn} signUpErrors={signUpErrors} />
                </ScrollView>
              </View>

              <View style={{
                width: scrollView_Width,
                justifyContent: 'center',
                flex: 1
              }}>
                <ScrollView scrollEnabled={true} vertical={true} overScrollMode="never" showsVerticalScrollIndicator={false}>
                  <ForgotPasswordForm
                    clickSignIn={this.clickSignIn}
                    onSubmit={this.handleSubmit}
                    forgotPasswordError={forgotPasswordError}
                  />

                </ScrollView>
              </View>
            </ScrollView>
            {/* 
            <Button title="Sign in with Facebook!" onPress={facebookLogin} />
            <Button title="Sign in with Google!" onPress={googleLogin} />
            <Button title="Sign up!" onPress={this.goToSignUp} />
            <Button title="Forgot password" onPress={this.goToForgotPassword} /> */}
          </Card>
        </KeyboardAvoidingView>
      </ImageBackground>
    );
  }
}

const mapStateToProps = state => {
  return {
    signUpErrors: signUpErrorsSelector(state),
    signInError: signInErrorSelector(state),
    forgotPasswordError: forgotPasswordErrorSelector(state),
    color: state.userReducer.Color,
    darkMode: state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  login,
  facebookLogin,
  googleLogin,
  appleLogin,
  signUp,
  setSignUpErrors,
  passwordForgot,
  setForgotPasswordError,

};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);



const styles = StyleSheet.create({

  loginCard: {
    backgroundColor: 'transparent',
    // backgroundColor: Color.backgroundColor
  },
  scrollViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },

});
