import produce from 'immer';
const initialState = {
    saveChallengeSuccess: "",
    saveChallengeError: "",
    addCommentSuccess: "",
    addCommentError: "",
    comments: [],
    getCommentsSuccess: false,
    getCommentsError: "",
    clappedData: [],
    clappedUsersSuccess: false,
    editPostSuccess: false,

    pinnedData: [],
    pinnedDataSuccess: false,
    saveChallengeRef: null

};

export default (state = initialState, action) =>
  produce(state, draft => {
    /*eslint-disable indent */
    switch (action.type) {
      case "SAVE_CHALLENGE_SUCCESS":
        draft.saveChallengeSuccess = action.payload;
        break;
      case "SAVE_CHALLENGE_ERROR":
        draft.saveChallengeError = action.payload;
        break;
      case "ADD_COMMENT_SUCCESS":
        draft.addCommentSuccess = action.payload;
        break;
      case "ADD_COMMENT_ERROR":
        draft.addCommentError = action.payload;
        break;
      case "SET_COMMENTS":
        draft.comments = action.payload;
        break;
      case "GET_COMMENTS_ERROR":
        draft.getCommentsError = action.payload;
        break;
      case "GET_COMMENTS_SUCCESS":
        draft.getCommentsSuccess = action.payload;
        break;
      case "SET_CLAPPED_USERS":
        draft.clappedData = action.payload;
        break;
      case "CLAPPED_USERS_SUCCESS":
        draft.clappedUsersSuccess = action.payload;
        break;
      case "EDIT_POST_SUCCESS":
        draft.editPostSuccess = action.payload;
        break;
      case "SET_PINNED_DATA":
        draft.pinnedData = action.payload;
        break;
      case "GET_PIN_POST_SUCCESS":
        draft.pinnedDataSuccess = action.payload;
        break;
      case "UPDATE_SAVE_CH_REF":
        alert('reducer')
        draft.saveChallengeRef = action.payload;
        break;
    }
  });
