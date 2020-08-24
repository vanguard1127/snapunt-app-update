import produce from 'immer';
import {
  GLOBAL_ERROR_SET,
  SIGNIN_ERROR_SET,
  SIGNUP_ERRORS_SET,
  FORGOT_PASSWORD_ERROR_SET,
  RESET_PASSWORD_ERROR_SET,
  PASSWORD_CHANGE_ERROR,
  SOCIAL_LOGIN_ERROR_SET,
  SET_VERIFY_CODE_ERROR,
  NOTIFICATION_SETTINGS_ERROR,
  GET_PROFILE_ERROR
} from '../actions/ActionTypes';

const initialState = {
  globalError: false,
  signInError: false,
  forgotPasswordError: "",
  resetPasswordError: "",
  signUpErrors: {},
  changePasswordError: false,
  socialLoginError: '',
  verificationError: '',
  notificationSettingsError: '',
  getProfileError: '',
  getUserSettingsError: '',
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case GLOBAL_ERROR_SET:
        draft.globalError = action.payload;
        break;
      case SIGNIN_ERROR_SET:
        draft.signInError = action.payload;
        break;
      case SIGNUP_ERRORS_SET:
        draft.signUpErrors = action.payload;
        break;
      case FORGOT_PASSWORD_ERROR_SET:
        draft.forgotPasswordError = action.payload;
        break;
      case RESET_PASSWORD_ERROR_SET:
        draft.resetPasswordError = action.payload;
        break;
      case PASSWORD_CHANGE_ERROR:
        draft.changePasswordError = action.payload;
        break;
      case SOCIAL_LOGIN_ERROR_SET:
        draft.socialLoginError = action.payload;
        break;
      case SET_VERIFY_CODE_ERROR:
        draft.verificationError = action.payload;
        break;
      case NOTIFICATION_SETTINGS_ERROR:
        draft.notificationSettingsError = action.payload;
        break;
      case GET_PROFILE_ERROR:
        draft.getProfileError = action.payload;
        break;
      case "GET_USER_SETTINGS_ERROR":
          draft.getUserSettingsError = action.payload;
          break;
    }
  });
