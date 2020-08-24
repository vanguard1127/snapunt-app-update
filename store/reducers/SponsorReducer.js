import produce from 'immer';
const initialState = {
    sponsorChallenges: [  ],
    sponsorChallengesSuccess: false,
    sponsorChallengesError: "",

    sponsorPosts: [  ],
    sponsorPostsSuccess: false,
    sponsorPostsError: "",

};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SET_SPONSOR_CH":
        draft.sponsorChallenges = action.payload;
        break;
      case "GET_SPONSOR_CH_SUCCESS":
        draft.sponsorChallengesSuccess = action.payload;
        break;
      case "GET_SPONSOR_CH_ERROR":
        draft.sponsorChallengesError = action.payload;
        break;


      case "SET_SPONSOR_POSTS":
        draft.sponsorPosts = action.payload;
        break;
      case "GET_SPONSOR_POSTS_SUCCESS":
        draft.sponsorPostsSuccess = action.payload;
        break;
      case "GET_SPONSOR_POSTS_ERROR":
        draft.sponsorPostsError = action.payload;
        break;
    }
  });
