export const getFeaturedChallenges = payload => {
    return {
      type: "GET_FEATURED_CH",
      payload
    };
  };

  export const setFeaturedChallenges = payload => {
    return {
      type: "SET_FEATURED_CH",
      payload
    };
  };

  export const getFeaturedChallengesSuccess = payload => {
    return {
      type: "GET_FEATURED_CH_SUCCESS",
      payload
    };
  };