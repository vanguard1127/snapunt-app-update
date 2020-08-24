import { call, put } from 'redux-saga/effects';
import { setLoader, setFlashMessage } from '../actions/LoaderAction';
import authService from '../../services/AuthService';
import NavigationService from '../../services/NavigationService';
import {
  setSignInError,
  setGlobalError,
  setSignUpErrors,
  changePasswordError,
  setForgotPasswordError,
  setResetPasswordError,
  setSocialLoginError,
  setVerificationError,
  notificationSettingsError,
  getProfileError,
  getUserSettingsError
} from '../actions/ErrorActions';
import { setUser, setChangePasswordSuccess, setUpdatedUser, notificationSettingsSuccess, getProfileSuccess, setProfileData, getUserSettingsSuccess, setUserSettings, setFriendProfileData, FriendProfileSuccess, friendProfileSuccess, getfriendProfileSuccess } from '../actions/UserActions';
import { profileService } from '../../services/ProfileService';
import reactotron from 'reactotron-react-native';
import notificationService from '../../services/NotificationService';

export function* userLogin({ payload }) {
  try {
    yield put(setSignInError(false));
    yield put(setLoader(true));
    yield call(authService.login, payload);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.response.status === 400) {
      yield put(setSignInError(true));
    } else if (error.response.status === 302){
      NavigationService.navigate('Verification', payload);
    }else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userFacebookLogin() {
  try {
    yield put(setLoader(true));
    yield call(authService.loginWithFacebook);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.message !== 'cancel') {
      if (error.response.status === 422) {
        yield put(setSocialLoginError(error.response.data.error));
      } else {
        yield put(setGlobalError(true));
      }
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* appleLogin({payload}) {
  try {
    yield put(setLoader(true));
    yield call(authService.loginWithApple, payload);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
        yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* userGoogleLogin() {
  try {
    yield put(setLoader(true));
    yield call(authService.loginWithGoogle);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.message !== 'cancel') {
      if (error.response.status === 422) {
        yield put(setSocialLoginError(error.response.data.error));
      } else {
        yield put(setGlobalError(true));
      }
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userSignUp({ payload }) {

  try {
    yield put(setSignUpErrors({}));
    yield put(setLoader(true));
    yield call(authService.signup, payload);
    NavigationService.navigate('Verification', payload);
  } catch (error) {
    if (error.response.status === 400) {
      yield put(setSignUpErrors(error.response.data.errors));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }

}

export function* verifyCode({ payload }) {

  try {
    yield put(setVerificationError({}));
    yield put(setLoader(true));
    yield call(authService.verifyCode, payload);
    if(payload.forgotPassword != undefined){
      NavigationService.navigate('ResetPassword', {email: payload.email});
    }else{
      NavigationService.navigate('AuthLoading');
    }
  } catch (error) {
    if (error.response.status === 400) {
      yield put(setVerificationError(error.response.data.errors));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }

}

export function* resendCode({ payload }) {
  
  try {
    yield put(setLoader(true));
    yield call(authService.resendCode, payload);
    yield put(setFlashMessage("Code has been sent!"));
  } catch (error) {
    yield put(setFlashMessage(error.response.data.errors.ex));
  } finally {
    yield put(setLoader(false));
  }

}

export function* userLogout() {
  try {
    yield put(setLoader(true));
    yield call(authService.logout);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    console.log(error); /*eslint-disable-line*/
  } finally {
    yield put(setLoader(false));
  }
}

export function* forgotPassword({ payload }) {
  try {
    yield put(setForgotPasswordError(""));
    yield put(setLoader(true));
    yield call(authService.forgotPassword, payload);
    NavigationService.navigate('Verification', {...payload, ...{forgotPassword: true}});
  } catch (error) {
    if (error.response.status === 400) {
      yield put(setForgotPasswordError(error.response.data.errors.ex));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* resetPassword({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(authService.resetPassword, payload);
    NavigationService.navigate('AuthLoading');
  } catch (error) {
    if (error.response.status === 400) {
      yield put(setResetPasswordError(error.response.data.errors.ex));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* userGet() {
  try {
    yield put(setLoader(true));
    const { data } = yield call(profileService.authMe);
    yield put(setUser(data));
  } catch (error) {
    yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* passwordChange({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(profileService.changePassword, payload);
    yield put(setChangePasswordSuccess(true));
    NavigationService.goBack();
  } catch (error) {
    if (error.response.status === 422) {
      yield put(changePasswordError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* updateUser({ payload }) {
  try {
    yield put(setLoader(true));
    const { data } = yield call(profileService.updateUser, payload);
    yield put(setUpdatedUser(data));
    NavigationService.goBack();
  } catch (error) {
    yield put(setFlashMessage("Something went wrong."));
  } finally {
    yield put(setLoader(false));
  }
}


export function* updateNotificationSettings({ payload }) {
  try {
    yield put(setLoader(true));
    yield call(notificationService.updateNotificationSettings , payload);
    yield put(notificationSettingsSuccess(true));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(notificationSettingsError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* getProfile({ payload }) {
  try {
    // if(payload == undefined){
    //   yield put(setLoader(true));
    // }
    // yield put(setLoader(true));
    let {data} = yield call(profileService.getProfile , payload);
    yield put(setProfileData(data));
    yield put(getProfileSuccess(true));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(getProfileError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* getFriendProfile({ payload }) {
  try {
    let {data} = yield call(profileService.getProfile , payload);
    yield put(setFriendProfileData(data));
    yield put(getfriendProfileSuccess(true));
  } catch (error) {
      yield put(setGlobalError(true));
  } finally {
    yield put(setLoader(false));
  }
}

export function* getUserSettings({ payload }) {
  try {
    yield put(setLoader(true));
    let {data} = yield call(notificationService.getUserSettings , payload);
    yield put(getUserSettingsSuccess(true));
    yield put(setUserSettings(data));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(getUserSettingsError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}