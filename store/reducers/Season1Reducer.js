import produce from 'immer';
const initialState = {
    season1Data: [  ],
    season1DataSuccess: false,
    season1DataError: "",
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SET_SEASON1_DATA":
        draft.season1Data = action.payload;
        break;
      case "GET_SEASON1_DATA_SUCCESS":
        draft.season1DataSuccess = action.payload;
        break;
      case "GET_SEASON1_DATA_SUCCESS":
        draft.season1DataError = action.payload;
        break;
    }
  });
