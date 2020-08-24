import produce from 'immer';
const initialState = {
    followSuccess : false,
    followError : "",

    acceptSuccess : false,
    acceptError : "",

    cancelSuccess : false,
    cancelError : "",

    getFriendsSuccess : false,
    getFriendsError : "",
    myFriends: [],

    //---------------------

    getFollowingsSuccess : false,
    getFollowingsError : "",
    followings: [],

    getFollowersSuccess : false,
    getFollowersError : "",
    followers: [],

    //--------------------

    activityDataSuccess : false,
    activityDataError : "",
    activityData: [],

    // --------------------
    getActivitiesSuccess : false,
    getActivitiesError : "",
    activities: []
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "FOLLOW_SUCCESS":
        draft.followSuccess = action.payload;
        break;
      case "FOLLOW_ERROR":
        draft.followError = action.payload;
        break;

      case "ACCEPT_REQUEST_SUCCESS":
        draft.acceptSuccess = action.payload;
        break;
      case "ACCEPT_REQUEST_ERROR":
        draft.acceptError = action.payload;
        break;

      case "CANCEL_REQUEST_SUCCESS":
        draft.cancelSuccess = action.payload;
        break;
      case "CANCEL_REQUEST_ERROR":
        draft.cancelError = action.payload;
        break;


      case "GET_FRIEND_SUCCESS":
        draft.getFriendsSuccess = action.payload;
        break;
      case "GET_FRIEND_ERROR":
        draft.getFriendsError = action.payload;
        break;
      case "SET_FRIEND":
        draft.myFriends = action.payload;
        break;


      case "ACTIVITY_DATA_SUCCESS":
        draft.activityDataSuccess = action.payload;
        break;
      case "ACTIVITY_DATA_ERROR":
        draft.activityDataError = action.payload;
        break;
      case "SET_ACTIVITY_DATA":
        draft.activityData = action.payload;
        break;

      case "GET_FOLLOWERS_SUCCESS":
        draft.getFollowersSuccess = action.payload;
        break;
      case "GET_FOLLOWERS_ERROR":
        draft.getFollowersError = action.payload;
        break;
      case "SET_FOLLOWERS":
        draft.followers = action.payload;
        break;


      case "GET_FOLLOWINGS_SUCCESS":
        draft.getFollowingsSuccess = action.payload;
        break;
      case "GET_FOLLOWINGS_ERROR":
        draft.getFollowingsError = action.payload;
        break;
      case "SET_FOLLOWINGS":
        draft.followings = action.payload;
        break;

      case "GET_ACTIVITIES_ERROR":
        draft.getActivitiesError = action.payload;
        break;
      case "GET_ACTIVITIES_SUCCESS":
        draft.getActivitiesSuccess = action.payload;
        break;
      case "SET_ACTIVITIES":
        draft.activities = action.payload;
        break;

    }
  });
