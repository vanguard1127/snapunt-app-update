import { SET_LOADER } from '../actions/ActionTypes';

export const setLoader = payload => {
  return {
    type: SET_LOADER,
    payload
  };
};

export const setFlashMessage = payload => {
    return {
      type: "SET_FLASH_MESSAGE",
      payload
    };
};


export const setRefreshLoading = payload => {
  return {
    type: "SET_REFRESH_LOADING",
    payload
  };
};