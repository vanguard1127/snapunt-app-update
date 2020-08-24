export const getSeason1Data = payload => {
    return {
      type: "GET_SEASON1_DATA",
      payload
    };
  };

  export const setSeason1Data = payload => {
    return {
      type: "SET_SEASON1_DATA",
      payload
    };
  };

  export const getSeason1DataSuccess = payload => {
    return {
      type: "GET_SEASON1_DATA_SUCCESS",
      payload
    };
  };

  export const getSeason1DataError = payload => {
    return {
      type: "GET_SEASON1_DATA_ERROR",
      payload
    };
  };