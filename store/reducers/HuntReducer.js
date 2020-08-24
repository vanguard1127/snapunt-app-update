import produce from 'immer';

const initialState = {
    selectedFriends : [],
    hunts: [],
    huntDetail : [],
    huntSnapOffs : [],

    saveHuntSuccess: false,
    saveHuntError: "",

    getHuntsSuccess: false,
    getHuntsError: "",

    huntDetailSuccess: false,
    huntDetailError: "",

    joinHuntSuccess: false,
    joinHuntError: "",

    huntSnapOffsSuccess: false,
    huntSnapOffsError: ""
};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SET_SELECTED_FRIENDS":
        draft.selectedFriends = action.payload;
        break;

      case "SAVE_HUNT_SUCCESS":
        draft.saveHuntSuccess = action.payload;
        break;

      case "SAVE_HUNT_ERROR":
        draft.saveHuntError = action.payload;
        break;

      case "GET_HUNTS_SUCCESS":
        draft.getHuntsSuccess = action.payload;
        break;

      case "GET_HUNTS_ERROR":
        draft.getHuntsError = action.payload;
        break;

      case "SET_HUNTS":
        draft.hunts = action.payload;
        break;

      case "HUNT_DETAIL_SUCCESS":
        draft.huntDetailSuccess = action.payload;
        break;

      case "HUNT_DETAIL_ERROR":
        draft.huntDetailError = action.payload;
        break;

      case "SET_HUNT_DETAIL":
        draft.huntDetail = action.payload;
        break;

      case "JOIN_HUNT_SUCCESS":
        draft.joinHuntSuccess = action.payload;
        break;

      case "JOIN_HUNT_ERROR":
        draft.joinHuntError = action.payload;
        break;

      case "HUNT_SNAPOFFS_SUCCESS":
        draft.huntSnapOffsSuccess = action.payload;
        break;

      case "HUNT_SNAPOFFS_ERROR":
        draft.huntSnapOffsError = action.payload;
        break;

      case "SET_HUNT_SNAPOFFS":
        draft.huntSnapOffs = action.payload;
        break;
    }
});
