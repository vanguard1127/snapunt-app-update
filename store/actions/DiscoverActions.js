export const searchUsers = payload => {
  return {
    type: "SEARCH_USERS",
    payload
  };
};

export const searchUsersSuccess = payload => {
  return {
    type: "SEARCH_USERS_SUCCESS",
    payload
  };
};

export const searchUsersError = payload => {
  return {
    type: "SEARCH_USERS_ERROR",
    payload
  };
};

export const setSearchUsers = payload => {
  return {
    type: "SET_SEARCH_USERS",
    payload
  };
};

export const searchResults = payload => {
  return {
    type: "SEARCH_RESULTS",
    payload
  };
};

export const searchResultsSuccess = payload => {
  return {
    type: "SEARCH_RESULTS_SUCCESS",
    payload
  };
};

export const searchResultsError = payload => {
  return {
    type: "SEARCH_RESULTS_ERROR",
    payload
  };
};

export const setSearchResults = payload => {
  return {
    type: "SET_SEARCH_RESULTS",
    payload
  };
};



export const flatResults = payload => {
  return {
    type: "FLAT_RESULTS",
    payload
  };
};

export const flatResultsSuccess = payload => {
  return {
    type: "FLAT_RESULTS_SUCCESS",
    payload
  };
};

export const flatResultsError = payload => {
  return {
    type: "FLAT_RESULTS_ERROR",
    payload
  };
};

export const setFlatResults = payload => {
  return {
    type: "SET_FLAT_RESULTS",
    payload
  };
};

export const resetDiscoverStore = payload => {
  return {
    type: "RESET_DISCOVER_STORE",
    payload
  };
};

export const getDiscoverData = payload => {
  return {
    type: "GET_DISCOVER_DATA",
    payload
  };
};


export const setDiscoverData = payload => {
  return {
    type: "SET_DISCOVER_DATA",
    payload
  };
};

export const discoverDataSuccess = payload => {
  return {
    type: "DISCOVER_DATA_SUCCESS",
    payload
  };
};

//------------------------------------------------------

export const getFlatCatData = payload => {
  return {
    type: "GET_FLAT_CAT_DATA",
    payload
  };
};


export const setFlatCatData = payload => {
  return {
    type: "SET_FLAT_CAT_DATA",
    payload
  };
};

export const flatCatDataSuccess = payload => {
  return {
    type: "FLAT_CAT_DATA_SUCCESS",
    payload
  };
};

//------------------------------------------------------

export const discoverDataError = payload => {
  return {
    type: "DISCOVER_DATA_ERROR",
    payload
  };
};

export const getCategoryData = payload => {
  return {
    type: "GET_CATEGORY_DATA",
    payload
  };
};


export const setCategoryData = payload => {
  return {
    type: "SET_CATEGORY_DATA",
    payload
  };
};

export const setCategorySuccess = payload => {
  return {
    type: "CATEGORY_SUCCESS",
    payload
  };
};

export const categoryError = payload => {
  return {
    type: "CATEGORY_ERROR",
    payload
  };
};

