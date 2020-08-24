import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_LOGOUT,
  SET_ACTIVE_USER,
  USER_FACEBOOK_LOGIN,
  USER_GOOGLE_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_GET,
  USER_SET,
  PASSWORD_CHANGE,
  PASSWORD_CHANGE_SUCCESS,
  USER_UPDATE,
  USER_UPDATE_SET,
  VERIFY_CODE,
  UPDATE_NOTIFICATION_SETTINGS,
  NOTIFICATION_SETTINGS_SUCCESS,
  GET_PROFILE_SUCCESS,
  GET_PROFILE,
  TOGGLE_THEME

} from './ActionTypes';

export const logout = () => {
  return {
    type: USER_LOGOUT
  };
};

export const login = user => {
  return {
    type: USER_LOGIN,
    payload: user
  };
};

export const signUp = user => {
  return {
    type: USER_SIGN_UP,
    payload: user
  };
};

export const setActiveUser = payload => {
  return {
    type: SET_ACTIVE_USER,
    payload
  };
};

export const facebookLogin = () => {
  return {
    type: USER_FACEBOOK_LOGIN
  };
};

export const googleLogin = () => {
  return {
    type: USER_GOOGLE_LOGIN
  };
};

export const passwordForgot = payload => {
  return {
    type: FORGOT_PASSWORD,
    payload
  };
};

export const passwordReset = payload => {
  return {
    type: RESET_PASSWORD,
    payload
  };
};

export const getUser = () => {
  return {
    type: USER_GET
  };
};

export const setUser = payload => {
  return {
    type: USER_SET,
    payload
  };
};

export const changePassword = payload => {
  return {
    type: PASSWORD_CHANGE,
    payload
  };
};

export const setChangePasswordSuccess = payload => {
  return {
    type: PASSWORD_CHANGE_SUCCESS,
    payload
  };
};

export const updateUser = payload => {
  return {
    type: USER_UPDATE,
    payload
  };
};

export const setUpdatedUser = payload => {
  return {
    type: USER_UPDATE_SET,
    payload
  };
};

export const verifyCode = payload => {
  return {
    type: VERIFY_CODE,
    payload
  };
};

export const updateNotificationSettings = payload => {
  return {
    type: UPDATE_NOTIFICATION_SETTINGS,
    payload
  };
};

export const notificationSettingsSuccess = payload => {
  return {
    type: NOTIFICATION_SETTINGS_SUCCESS,
    payload
  };
};

export const getProfile = payload => {
  return {
    type: GET_PROFILE,
    payload
  };
};

export const getProfileSuccess = payload => {
  return {
    type: GET_PROFILE_SUCCESS,
    payload
  };
};

export const setProfileData = payload => {
  return {
    type: "SET_PROFILE_DATA",
    payload
  };
};

export const getFriendProfile = payload => {
  return {
    type: "GET_FRIEND_PROFILE",
    payload
  };
};

export const getfriendProfileSuccess = payload => {
  return {
    type: "GET_FRIEND_PROFILE_SUCCESS",
    payload
  };
};

export const setFriendProfileData = payload => {
  return {
    type: "SET_FRIEND_PROFILE_DATA",
    payload
  };
};

export const updateProfileData = payload => {
  return {
    type: "UPDATE_PROFILE_DATA",
    payload
  };
};


export const getUserSettings = payload => {
  return {
    type: "GET_USER_SETTINGS",
    payload
  };
};

export const getUserSettingsSuccess = payload => {
  return {
    type: "GET_USER_SETTINGS_SUCCESS",
    payload
  };
};

export const setUserSettings = payload => {
  return {
    type: "SET_USER_SETTINGS",
    payload
  };
};

export const setLoadingText = payload => {
  return {
    type: "SET_LOADING_TEXT",
    payload
  };
};

export const resendCode = payload => {
  return {
    type: "RESEND_CODE",
    payload
  };
};

export const appleLogin = payload => {
  return {
    type: "APPLE_LOGIN",
    payload
  };
};
export const toggleTheme = payload => {
  return {
    type: TOGGLE_THEME,
    payload
  };
};
