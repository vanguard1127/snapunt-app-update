import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, AsyncStorage } from 'react-native';
import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import NavigationService from '../../services/NavigationService';
import { TextInputField } from '../shared/FormFields';
import { signInValidationRules } from '../../validation/auth';
import $t from '@i18n';
import ErrorText from '../shared/Text/ErrorText';
import { Button } from 'react-native-paper';
import Color from "../../constants/Colors";
import { OutlineButton, TransparentButton, TextButton } from '../shared/Button/Button';
import * as AppleAuthentication from 'expo-apple-authentication';
import Swiper from 'react-native-page-swiper'
import { Col } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import s from '../../constants/Form';
import Colors from '../../constants/Colors';
import normalize from "react-native-normalize";

export default class SignInForm extends React.Component {

  state = {
    appleAvail: false,
    SigninText1: "Hello Again.",
    SigninText2: "Welcome Back."
  }

  componentDidMount() {
    AppleAuthentication.isAvailableAsync().then((btn) => {
      this.setState({ appleAvail: btn })
    })
  }

  OnValidateError() {
    this.setState({ SigninText1: "Something went wrong" });
    this.setState({ SigninText2: "signing you in." })
  }

  render() {
    var props = this.props
    return <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={values => props.onSubmit(values)}
      validationSchema={signInValidationRules}

    >
      {({ handleSubmit }) => (
        <View style={styles.container} >
          <ScrollView style={s.ScrollViewContainerPadding}>
            <View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={s.formTitle} numberOfLines={2}>{this.state.SigninText1}</Text>
                <Text style={[{ marginBottom: 40 }, s.formTitle]} numberOfLines={2}>{this.state.SigninText2}</Text>
              </View>
              <Field
                name="email"
                component={TextInputField}
                placeholder={$t('auth.enterEmail')}
                style={s.input}
                placeholderTex="red"
              />
              <View style={{ flexDirection: 'row', height: 35 }} >
                <View style={{ flex: 1, height: 35, width: "100%" }}>
                  <Field
                    name="password"
                    component={TextInputField}
                    secureTextEntry
                    placeholder={$t('auth.enterPassword')}
                    style={[s.input, { color: Colors.backgroundColor }]}
                  />
                </View>
                <TextButton onPress={() => props.clickForgotPassword()} text="Forgot password" style={s.forgetPasswordStyle} />
                {/* <TextButton  onPress={() => NavigationService.navigate('ForgotPassword')} text="Forgot password" style= {{color: Colors.textInputColor, flex:1, marginTop: 10, height: 40}}/> */}
              </View>
              <ErrorText error={!!props.signInError} message={$t('auth.invalidCredentials')} />

              {/* <TouchableOpacity onPress={handleSubmit}>
              <Text>{$t('auth.signIn')}</Text>
            </TouchableOpacity> */}

              <OutlineButton onPress={handleSubmit} style={s.Button} text="Sign in" />

              {/* <OutlineButton onPress={props.facebookLogin} style={{ marginBottom: 10 }} text="Login With Facebook" /> */}

              {this.state.appleAvail && <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                cornerRadius={5}
                style={{ width: "100%", height: 44 }}
                onPress={async () => {
                  try {
                    var isAuth = false
                    const appleToken = await AsyncStorage.getItem('appleToken')
                    if (appleToken != undefined && appleToken) {
                      isAuth = await AppleAuthentication.getCredentialStateAsync(appleToken)
                    }
                    if (!isAuth) {
                      const credential = await AppleAuthentication.signInAsync({
                        requestedScopes: [
                          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                          AppleAuthentication.AppleAuthenticationScope.EMAIL,
                        ],
                      });
                      await AsyncStorage.setItem('appleToken', credential.user);
                      props.appleLogin(credential)
                    } else {
                      props.appleLogin({
                        appleToken: appleToken
                      })
                    }
                  } catch (e) {
                    if (e.code === 'ERR_CANCELED') {
                      // handle that the user canceled the sign-in flow
                    } else {
                      // handle other errors
                      console.log(e)
                    }
                  }
                }}
              />}
              <View style={s.LinkToOther}>
                <Text style={{ color: Colors.lightGrey }} >New to SnapHunt?</Text>
                {/* <TextButton  onPress={() =>  NavigationService.navigate('SignUp')} style = {{color:Colors.primaryBackgroundColor, marginLeft: 20}} text="Sign Up" /> */}
                <TextButton onPress={() => props.clickSignUp()} style={{ color: Colors.primaryBackgroundColor, marginLeft: 10 }} text="Sign Up" />
              </View>
              {/* <View style={{marginTop: 10, alignItems: "center"}} >
              <TextButton  onPress={() => NavigationService.navigate('ForgotPassword')} text="Forgot your password?" />
            </View> */}
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  }
}

SignInForm.propTypes = {
  onSubmit: PropTypes.func,
  clickForgotPass: PropTypes.func,
  signInError: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(20)
  },
});
