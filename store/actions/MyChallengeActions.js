export const getSavedChallenges = payload => {
    return {
      type: "GET_SAVED_CH",
      payload
    };
  };

  export const setSavedChallenges = payload => {
    return {
      type: "SET_SAVED_CH",
      payload
    };
  };

  export const getSavedChallengesSuccess = payload => {
    return {
      type: "GET_SAVED_CH_SUCCESS",
      payload
    };
  };

  export const getSavedChallengesError = payload => {
    return {
      type: "GET_SAVED_CH_ERROR",
      payload
    };
  };