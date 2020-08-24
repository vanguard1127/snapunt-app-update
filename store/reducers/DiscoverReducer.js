import produce from 'immer';
const initialState = {
    searchUsersSuccess : false,
    searchUsersError : "",
    results: [],
    fullResults: [],
    searchResultsSuccess: false,
    searchResultsError: "",

    flatUsers: [],
    flatResultsSuccess: false,
    flatResultsError: "",

    discoverData: [],
    discoverDataSuccess: false,
    discoverDataError: "",

    flatCatData: [],
    flatCatDataSuccess: false,

    categoryData: [],
    categoryDataSuccess: false,
    categoryDataError: "",
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SEARCH_USERS_SUCCESS":
        draft.searchUsersSuccess = action.payload;
        break;
      case "SEARCH_USERS_ERROR":
        draft.searchUsersError = action.payload;
        break;
      case "SET_SEARCH_USERS":
        draft.results = action.payload;
        break;
      case "SET_SEARCH_RESULTS":
        draft.fullResults = action.payload;
        break;
      case "SEARCH_RESULTS_SUCCESS":
        draft.searchResultsSuccess = action.payload;
        break;
      case "SEARCH_RESULTS_ERROR":
        draft.searchResultsError = action.payload;
        break;
      case "SET_FLAT_RESULTS":
        draft.flatUsers = action.payload;
        break;
      case "FLAT_RESULTS_SUCCESS":
        draft.flatResultsSuccess = action.payload;
        break;
      case "FLAT_RESULTS_ERROR":
        draft.flatResultsError = action.payload;
        break;


      case "SET_DISCOVER_DATA":
        draft.discoverData = action.payload;
        break;
      case "DISCOVER_DATA_SUCCESS":
        draft.discoverDataSuccess = action.payload;
        break;
      case "DISCOVER_DATA_ERROR":
        draft.discoverDataError = action.payload;
        break;


      case "SET_FLAT_CAT_DATA":
        draft.flatCatData = action.payload;
        break;
      case "FLAT_CAT_DATA_SUCCESS":
        draft.flatCatDataSuccess = action.payload;
        break;


      case "SET_CATEGORY_DATA":
        draft.categoryData = action.payload;
        break;
      case "CATEGORY_SUCCESS":
        draft.categoryDataSuccess = action.payload;
        break;
      case "CATEGORY_ERROR":
        draft.categoryDataError = action.payload;
        break;


      case "RESET_DISCOVER_STORE":
        return initialState
    }
  });
