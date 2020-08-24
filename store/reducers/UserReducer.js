import produce from 'immer';
import { lightTheme, darkTheme } from './../../constants/Colors';
import {
  SET_ACTIVE_USER,
  USER_LOGOUT,
  USER_SET,
  PASSWORD_CHANGE_SUCCESS,
  USER_UPDATE_SET,
  NOTIFICATION_SETTINGS_SUCCESS,
  GET_PROFILE_SUCCESS,
  TOGGLE_THEME
} from '../actions/ActionTypes';

const initialState = {
  userToken: {},
  user: {},
  passwordChanged: false,
  notificationSettingsSuccess: '',
  getProfileSuccess: false,
  profileData: [],

  friendProfileSuccess: false,
  friendProfileData: [],

  getUserSettingsSuccess: '',
  userSettings: [],
  loadingText: "",
  DarkMode: false,
  Color: lightTheme
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_ACTIVE_USER:
        draft.userToken = action.payload;
        break;
      case USER_LOGOUT:
        return initialState;
      case USER_SET:
        draft.user = action.payload;
        break;
      case USER_UPDATE_SET:
        draft.user = { ...draft.user, ...action.payload };
        break;
      case PASSWORD_CHANGE_SUCCESS:
        draft.passwordChanged = action.payload;
        break;
      case NOTIFICATION_SETTINGS_SUCCESS:
        draft.notificationSettingsSuccess = action.payload;
        break;
      case GET_PROFILE_SUCCESS:
        draft.getProfileSuccess = action.payload;
        break;
      case "SET_PROFILE_DATA":
        draft.profileData = action.payload
        break;

      case "GET_FRIEND_PROFILE_SUCCESS":
        draft.friendProfileSuccess = action.payload;
        break;
      case "SET_FRIEND_PROFILE_DATA":
        draft.friendProfileData = action.payload
        break;

      case "UPDATE_PROFILE_DATA":
        draft.profileData = { ...draft.profileData, ...action.payload }
        break;

      case "GET_USER_SETTINGS_SUCCESS":
        draft.getUserSettingsSuccess = action.payload;
        break;
      case "SET_USER_SETTINGS":
        draft.userSettings = action.payload;
        break;
      case "SET_LOADING_TEXT":
        draft.loadingText = action.payload;
        break;
      case TOGGLE_THEME:
        if (action.payload == true) {
          draft.DarkMode = action.payload;
          draft.Color = darkTheme;
        } else {
          draft.DarkMode = action.payload;
          draft.Color = lightTheme;
        }
        break;
    }
  });
