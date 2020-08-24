export const getSponsorChallenges = payload => {
    return {
      type: "GET_SPONSOR_CH",
      payload
    };
  };

  export const setSponsorChallenges = payload => {
    return {
      type: "SET_SPONSOR_CH",
      payload
    };
  };

  export const getSponsorChallengesSuccess = payload => {
    return {
      type: "GET_SPONSOR_CH_SUCCESS",
      payload
    };
  };

  export const getSponsorChallengesError = payload => {
    return {
      type: "GET_SPONSOR_CH_ERROR",
      payload
    };
  };

  // Sponso Posts, people who did snapoffs for spansor challenges

  export const getSponsorPosts = payload => {
    return {
      type: "GET_SPONSOR_POST",
      payload
    };
  };

  export const setSponsorPosts = payload => {
    return {
      type: "SET_SPONSOR_POSTS",
      payload
    };
  };

  export const getSponsorPostsSuccess = payload => {
    return {
      type: "GET_SPONSOR_POSTS_SUCCESS",
      payload
    };
  };

  export const getSponsorPostsError = payload => {
    return {
      type: "GET_SPONSOR_POSTS_ERROR",
      payload
    };
  };