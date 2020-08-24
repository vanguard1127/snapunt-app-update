import produce from 'immer';
const initialState = {
    featuredChallenges: [  ],
    featuredChallengesSuccess: false,
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SET_FEATURED_CH":
        draft.featuredChallenges = action.payload;
        break;
      case "GET_FEATURED_CH_SUCCESS":
        draft.featuredChallengesSuccess = action.payload;
        break;
    }
  });
