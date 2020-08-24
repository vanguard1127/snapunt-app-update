import React from 'react';
import { StyleSheet, View, Dimensions, ScrollView, ImageBackground, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Logo } from '../../components/shared/Logo';

import { ForgotPasswordForm } from '../../components/auth/ForgotPasswordForm';
import { passwordForgot } from '../../store/actions/UserActions';
import { setForgotPasswordError } from '../../store/actions/ErrorActions';
import { forgotPasswordErrorSelector } from '../../store/selectors/ErrorSelector';

class ForgotPasswordScreen extends React.Component {
  static navigationOptions = {
    title: 'Forgot Password'
  };

  static propTypes = {
    navigation: PropTypes.object,
    passwordForgot: PropTypes.func,
    forgotPasswordError: PropTypes.string,
    setForgotPasswordError: PropTypes.func
  };

  componentWillUnmount() {
    this.props.setForgotPasswordError("");
  }

  clickSignIn = () => {
    this.props.navigation.navigate("SignIn")
  }

  handleSubmit = forgotPasswordData => {
    this.props.passwordForgot(forgotPasswordData);
  };

  render() {
    const { forgotPasswordError } = this.props;
    let scrollView_Width = Dimensions.get('window').width;

    return (
      <ImageBackground source={require('../../assets/images/background_first.png')} style={{ width: null, height: null, flex: 1, resizeMode: 'cover', alignSelf: 'stretch' }}>
        <View style={styles.container}>
          <KeyboardAvoidingView enableOnAndroid
            behavior="padding"
            sytle={styles.scrollViewContainer}
          >
            <Logo />
            <ScrollView>
              <View style={{
                width: scrollView_Width,
                justifyContent: 'center',
                flex: 1
              }}>
                <ScrollView scrollEnabled={true} vertical={true}>
                  <ForgotPasswordForm
                    clickSignIn={this.clickSignIn}
                    onSubmit={this.handleSubmit}
                    forgotPasswordError={forgotPasswordError}
                  />
                </ScrollView>
              </View>
            </ScrollView>

          </KeyboardAvoidingView>
        </View>
      </ImageBackground>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  scorllViewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  ForgotPasswordCard: {
    backgroundColor: "transparent",
  }
});

const mapStateToProps = state => {
  return {
    forgotPasswordError: forgotPasswordErrorSelector(state),
    color: state.userReducer.Color,
    darkMode: state.userReducer.DarkMode,
  };
};

const mapDispatchToProps = { passwordForgot, setForgotPasswordError };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPasswordScreen);