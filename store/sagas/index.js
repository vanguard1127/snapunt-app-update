import { all, takeLatest } from 'redux-saga/effects';
import {
  USER_LOGIN,
  USER_SIGN_UP,
  USER_LOGOUT,
  USER_GOOGLE_LOGIN,
  USER_FACEBOOK_LOGIN,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  USER_GET,
  PASSWORD_CHANGE,
  USER_UPDATE,
  VERIFY_CODE,
  UPDATE_NOTIFICATION_SETTINGS,
  GET_PROFILE
} from '../actions/ActionTypes';
import {
  userLogin,
  userSignUp,
  userLogout,
  userFacebookLogin,
  userGoogleLogin,
  forgotPassword, 
  resetPassword,
  userGet,
  passwordChange,
  updateUser,
  verifyCode,
  updateNotificationSettings,
  getProfile,
  getUserSettings,
  getFriendProfile,
  resendCode,
  appleLogin
} from '../sagas/ActiveUserSagas';
import { saveChallenge, addClap, addComment, getComments, deleteDraft, report, clappedUsers, editPost, pinPost } from './ChallengeSagas';
import { searchUsers, getSearchResults, getFlatResults, getDiscoverData, getCategoryData, getFlatCatData } from './DiscoverSagas';
import { follow, acceptRequest, cancelRequest, getFriends, getActivity, getFollowings, getFollowers, getActivities } from './FollowSagas';
import { fetchHomeData } from './HomeSagas';
import { getSeason1Data } from './Season1Sagas';
import { getSavedChallenges } from './MyChallengeSagas';
import { getSponsorChallenges, getSponsorPosts } from './SponsorSagas';
import { saveHunt, getHunts, huntDetail, joinHunt, huntSnapOffs } from './HuntSagas';
import { getFeaturedChallenges } from './FeaturedSagas';

export default function* rootSaga() {
  try{
    yield all([
      takeLatest(USER_LOGIN, userLogin),
      takeLatest(USER_SIGN_UP, userSignUp),
      takeLatest(USER_LOGOUT, userLogout),
      takeLatest(USER_FACEBOOK_LOGIN, userFacebookLogin),
      takeLatest("APPLE_LOGIN", appleLogin),
      takeLatest(USER_GOOGLE_LOGIN, userGoogleLogin),
      takeLatest(FORGOT_PASSWORD, forgotPassword),
      takeLatest(RESET_PASSWORD, resetPassword),
      takeLatest(USER_GET, userGet),
      takeLatest(PASSWORD_CHANGE, passwordChange),
      takeLatest(USER_UPDATE, updateUser),
      takeLatest(VERIFY_CODE, verifyCode),
      takeLatest(UPDATE_NOTIFICATION_SETTINGS, updateNotificationSettings),
      takeLatest(GET_PROFILE, getProfile),
      takeLatest("GET_USER_SETTINGS", getUserSettings),
      takeLatest("SAVE_CHALLENGE", saveChallenge),
      takeLatest("ADD_CLAP", addClap),
      takeLatest("ADD_COMMENT", addComment),
      takeLatest("GET_COMMENTS", getComments),
      takeLatest("SEARCH_USERS", searchUsers),
      takeLatest("SEARCH_RESULTS", getSearchResults),
      takeLatest("FLAT_RESULTS", getFlatResults),
      takeLatest("FOLLOW", follow),
      takeLatest("FETCH_HOME_DATA", fetchHomeData),
      takeLatest("ACCEPT_REQUEST", acceptRequest),
      takeLatest("CANCEL_REQUEST", cancelRequest),
      takeLatest("GET_DISCOVER_DATA", getDiscoverData),
      takeLatest("GET_CATEGORY_DATA", getCategoryData),
      takeLatest("GET_SEASON1_DATA", getSeason1Data),
      takeLatest("GET_SAVED_CH", getSavedChallenges),
      takeLatest("DELETE_DRAFT", deleteDraft),
      takeLatest("GET_SPONSOR_CH", getSponsorChallenges),
      takeLatest("GET_SPONSOR_POST", getSponsorPosts),
      takeLatest("GET_FRIENDS", getFriends),
      takeLatest("SAVE_HUNT", saveHunt),
      takeLatest("GET_HUNTS", getHunts),
      takeLatest("HUNT_DETAIL", huntDetail),
      takeLatest("JOIN_HUNT", joinHunt),
      takeLatest("HUNT_SNAPOFFS", huntSnapOffs),
      takeLatest("GET_FRIEND_PROFILE", getFriendProfile),
      takeLatest("ACTIVITY_DATA", getActivity),
      takeLatest("RESEND_CODE", resendCode),
      takeLatest("GET_FOLLOWERS", getFollowers),
      takeLatest("GET_FOLLOWINGS", getFollowings),
      takeLatest("GET_ACTIVITIES", getActivities),
      takeLatest("REPORT", report),
      takeLatest("CLAPPED_USERS", clappedUsers),
      takeLatest("EDIT_POST", editPost),
      takeLatest("PIN_POST", pinPost),
      takeLatest("GET_FEATURED_CH", getFeaturedChallenges),
      takeLatest("GET_FLAT_CAT_DATA", getFlatCatData),
    ]);
  }catch(err){
    console.log(err)
  }
}
