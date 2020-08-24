import {
  GLOBAL_ERROR_SET,
  SIGNIN_ERROR_SET,
  SIGNUP_ERRORS_SET,
  PASSWORD_CHANGE_ERROR,
  RESET_PASSWORD_ERROR_SET,
  FORGOT_PASSWORD_ERROR_SET,
  SOCIAL_LOGIN_ERROR_SET,
  SET_VERIFY_CODE_ERROR,
  NOTIFICATION_SETTINGS_ERROR,
  GET_PROFILE_ERROR
} from './ActionTypes';

export const setGlobalError = payload => {
  return {
    type: GLOBAL_ERROR_SET,
    payload
  };
};

export const setSignInError = payload => {
  return {
    type: SIGNIN_ERROR_SET,
    payload
  };
};

export const setSignUpErrors = payload => {
  return {
    type: SIGNUP_ERRORS_SET,
    payload
  };
};

export const setResetPasswordError = payload => {
  return {
    type: RESET_PASSWORD_ERROR_SET,
    payload
  };
};

export const setForgotPasswordError = payload => {
  return {
    type: FORGOT_PASSWORD_ERROR_SET,
    payload
  };
};

export const changePasswordError = payload => {
  return {
    type: PASSWORD_CHANGE_ERROR,
    payload
  };
};

export const setSocialLoginError = payload => {
  return {
    type: SOCIAL_LOGIN_ERROR_SET,
    payload
  };
};


export const setVerificationError = payload => {
  return {
    type: SET_VERIFY_CODE_ERROR,
    payload
  };
};

export const notificationSettingsError = payload => {
  return {
    type: NOTIFICATION_SETTINGS_ERROR,
    payload
  };
};

export const getProfileError = payload => {
  return {
    type: GET_PROFILE_ERROR,
    payload
  };
};

export const getUserSettingsError = payload => {
  return {
    type: "GET_USER_SETTINGS_ERROR",
    payload
  };
}; 
