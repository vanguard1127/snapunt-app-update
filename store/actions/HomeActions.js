export const getHomeData = payload => {
    return {
      type: "FETCH_HOME_DATA",
      payload: payload
    };
  };
  
  export const setHomeData = payload => {
    return {
      type: "SET_HOME_DATA",
      payload: payload
    };
  };

  export const homeDataSuccess = payload => {
    return {
      type: "HOME_DATA_SUCCESS",
      payload: payload
    };
  };

  export const homeDataError = payload => {
    return {
      type: "HOME_DATA_ERROR",
      payload: payload
    };
  };