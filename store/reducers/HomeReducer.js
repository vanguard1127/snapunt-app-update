import produce from 'immer';
const initialState = {
    homeDataSuccess : false,
    homeDataError : "",
    homeData: [],
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SET_HOME_DATA":
        draft.homeData = action.payload;
        break;
      case "HOME_DATA_SUCCESS":
        draft.homeDataSuccess = action.payload;
        break;
      case "HOME_DATA_ERROR":
        draft.homeDataError = action.payload;
        break;
    }
  });
