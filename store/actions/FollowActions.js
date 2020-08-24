
export const follow = payload => {
    return {
      type: "FOLLOW",
      payload
    };
  };

  export const followSuccess = payload => {
    return {
      type: "FOLLOW_SUCCESS",
      payload
    };
  };

  export const followError = payload => {
    return {
      type: "FOLLOW_ERROR",
      payload
    };
  };

  export const acceptRequest = payload => {
    return {
      type: "ACCEPT_REQUEST",
      payload
    };
  };

  export const acceptRequestSuccess = payload => {
    return {
      type: "ACCEPT_REQUEST_SUCCESS",
      payload
    };
  };

  export const acceptRequestError = payload => {
    return {
      type: "ACCEPT_REQUEST_ERROR",
      payload
    };
  };

  export const cancelRequest = payload => {
    return {
      type: "CANCEL_REQUEST",
      payload
    };
  };

  export const  cancelRequestSuccess = payload => {
    return {
      type: "CANCEL_REQUEST_SUCCESS",
      payload
    };
  };

  export const cancelRequestError = payload => {
    return {
      type: "CANCEL_REQUEST_ERROR",
      payload
    };
  };

  export const getFriends = payload => {
    return {
      type: "GET_FRIENDS",
      payload
    };
  };

  export const  getFriendSuccess = payload => {
    return {
      type: "GET_FRIEND_SUCCESS",
      payload
    };
  };

  export const getFriendError = payload => {
    return {
      type: "GET_FRIEND_ERROR",
      payload
    };
  };

  export const setFriends = payload => {
    return {
      type: "SET_FRIEND",
      payload
    };
  };

  //-----------------------------------------------
  export const activityData = payload => {
    return {
      type: "ACTIVITY_DATA",
      payload
    };
  };

  export const  activityDataSuccess = payload => {
    return {
      type: "ACTIVITY_DATA_SUCCESS",
      payload
    };
  };

  export const activityDataError = payload => {
    return {
      type: "ACTIVITY_DATA_ERROR",
      payload
    };
  };

  export const setActivityData = payload => {
    return {
      type: "SET_ACTIVITY_DATA",
      payload
    };
  };

  //----------------------------------------------

  export const getFollowings = payload => {
    return {
      type: "GET_FOLLOWINGS",
      payload
    };
  };

  export const  getFollowingsSuccess = payload => {
    return {
      type: "GET_FOLLOWINGS_SUCCESS",
      payload
    };
  };

  export const getFollowingsError = payload => {
    return {
      type: "GET_FOLLOWINGS_ERROR",
      payload
    };
  };

  export const setFollowings = payload => {
    return {
      type: "SET_FOLLOWINGS",
      payload
    };
  };


    //----------------------------------------------

    export const getFollowers = payload => {
      return {
        type: "GET_FOLLOWERS",
        payload
      };
    };
  
    export const  getFollowersSuccess = payload => {
      return {
        type: "GET_FOLLOWERS_SUCCESS",
        payload
      };
    };
  
    export const getFollowersError = payload => {
      return {
        type: "GET_FOLLOWERS_ERROR",
        payload
      };
    };
  
    export const setFollowers = payload => {
      return {
        type: "SET_FOLLOWERS",
        payload
      };
    };


    // ------------------------------------------

    export const getActivities = payload => {
      return {
        type: "GET_ACTIVITIES",
        payload
      };
    };
  
    export const  getActivitiesSuccess = payload => {
      return {
        type: "GET_ACTIVITIES_SUCCESS",
        payload
      };
    };
  
    export const getActivitiesError = payload => {
      return {
        type: "GET_ACTIVITIES_ERROR",
        payload
      };
    };
  
    export const setActivities = payload => {
      return {
        type: "SET_ACTIVITIES",
        payload
      };
    };
  