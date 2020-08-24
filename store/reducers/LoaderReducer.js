import { SET_LOADER } from '../actions/ActionTypes';
import produce from 'immer';

const initialState = {
  globalLoader: false,
  refreshLoader: false,
  flashMessage: ""
}

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case SET_LOADER:
        draft.globalLoader = action.payload;
        break
      case "SET_REFRESH_LOADING":
        draft.refreshLoader = action.payload;
        break
      case "SET_FLASH_MESSAGE":
        draft.flashMessage = action.payload;
        break
    }
  })
