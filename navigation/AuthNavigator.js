import { createStackNavigator } from 'react-navigation-stack';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import OfflineScreen from '../screens/OfflineScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import ForgotPasswordSuccess from '../screens/auth/ForgotPasswordSuccess';
import ResetPasswordSuccess from '../screens/auth/ResetPasswordSuccess';
import VerificationScreen from '../screens/auth/VerificationScreen';
import Terms from '../screens/auth/Terms';


export default createStackNavigator({
  SignIn: {
    screen: SignInScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Terms: {
    screen: Terms,
    navigationOptions: () => {
      return {title: "Terms and Conditions"}
    }
  },
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  Verification: {
    screen: VerificationScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ForgotPassword: {
    screen: ForgotPasswordScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ForgotPasswordSuccess,
  ResetPassword: {
    screen: ResetPasswordScreen,
    navigationOptions: {
      headerShown: false
    }
  },
  ResetPasswordSuccess,
  Offline: {
    screen: OfflineScreen
  }
},
{
  unmountInactiveRoutes: true
});
