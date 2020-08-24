import produce from 'immer';
const initialState = {
    savedChallenges: [  ],
    savedChallengesSuccess: false,
    savedChallengesError: "",
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SET_SAVED_CH":
        draft.savedChallenges = action.payload;
        break;
      case "GET_SAVED_CH_SUCCESS":
        draft.savedChallengesSuccess = action.payload;
        break;
      case "GET_SAVED_CH_ERROR":
        draft.savedChallengesError = action.payload;
        break;
    }
  });
