import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import $t from '@i18n';

import { connect } from 'react-redux';
import { signUp } from '../../store/actions/UserActions';
import { setSignUpErrors } from '../../store/actions/ErrorActions';
import { SignUpForm } from '../../components/auth/SignUpForm';
import { signUpErrorsSelector } from '../../store/selectors/ErrorSelector';
import { Avatar, Button, Card, Title, Headline } from 'react-native-paper';
import Color from "../../constants/Colors"
import { TextButton } from '../../components/shared/Button/Button';
import NavigationService from '../../services/NavigationService';
import { Logo } from '../../components/shared/Logo';


class SignUpScreen extends React.Component {

  static navigationOptions = {
    title: $t('auth.signUp')
  };

  static propTypes = {
    navigation: PropTypes.object,
    signUp: PropTypes.func,
    signUpErrors: PropTypes.object,
    setSignUpErrors: PropTypes.func
  };

  componentWillUnmount() {
    this.props.setSignUpErrors({});
  }

  signUp = signupData => {
    this.props.signUp(signupData);
  };

  render() {
    const { signUpErrors } = this.props;
    let scrollView_Width = Dimensions.get('window').width;

    return (
      <ImageBackground source={require('../../assets/images/background_first.png')} style={{ width: null, height: null, flex: 1, resizeMode: 'cover', alignSelf: 'stretch' }}>
        <View style={styles.container}>
          <KeyboardAvoidingView enableOnAndroid
            behavior="padding"
            sytle={styles.scrollViewContainer}
          >

            <Card style={styles.SignupCard} elevation={0}>
              <ScrollView>
                <Logo />
                <View style={{
                  width: scrollView_Width,
                  justifyContent: 'center',
                  flex: 1
                }}>
                  <ScrollView scrollEnabled={true} vertical={true}>
                    <SignUpForm onSubmit={this.signUp} signUpErrors={signUpErrors} />
                  </ScrollView>
                </View>
              </ScrollView>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1,
    // marginTop: Constants.statusBarHeight
  },
  SignupCard: {
    backgroundColor: "transparent",
  },
  scorllViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  }
});

const mapStateToProps = state => {
  return {
    signUpErrors: signUpErrorsSelector(state),
    color: state.userReducer.Color,
    darkMode: state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = {
  signUp,
  setSignUpErrors
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);
