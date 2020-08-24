export const saveChallenge = payload => {
    return {
      type: "SAVE_CHALLENGE",
      payload
    };
  };

export const saveChallengeSuccess = payload => {
  return {
    type: "SAVE_CHALLENGE_SUCCESS",
    payload
  };
};

export const saveChallengeError = payload => {
  return {
    type: "SAVE_CHALLENGE_ERROR",
    payload
  };
};

export const addClap = payload => {
  return {
    type: "ADD_CLAP",
    payload
  };
};

export const addClapError = payload => {
  return {
    type: "ADD_CLAP_ERROR",
    payload
  };
};

export const addClapSuccess = payload => {
  return {
    type: "ADD_CLAP_SUCCESS",
    payload
  };
};

export const addComment = payload => {
  return {
    type: "ADD_COMMENT",
    payload
  };
};

export const addCommentError = payload => {
  return {
    type: "ADD_COMMENT_ERROR",
    payload
  };
};

export const addCommentSuccess = payload => {
  return {
    type: "ADD_COMMENT_SUCCESS",
    payload
  };
};

export const getComments = payload => {
  return {
    type: "GET_COMMENTS",
    payload
  };
};

export const getCommentsError = payload => {
  return {
    type: "GET_COMMENTS_ERROR",
    payload
  };
};

export const getCommentsSuccess = payload => {
  return {
    type: "GET_COMMENTS_SUCCESS",
    payload
  };
};

export const setComments = payload => {
  return {
    type: "SET_COMMENTS",
    payload
  };
};

export const deleteDraft = payload => {
  return {
    type: "DELETE_DRAFT",
    payload
  };
};

export const report = payload => {
  return {
    type: "REPORT",
    payload
  };
};

export const clappedUsers = payload => {
  return {
    type: "CLAPPED_USERS",
    payload
  };
};

export const clappedUsersSuccess = payload => {
  return {
    type: "CLAPPED_USERS_SUCCESS",
    payload
  };
};

export const setClappedUsers = payload => {
  return {
    type: "SET_CLAPPED_USERS",
    payload
  };
};

export const editPost = payload => {
  return {
    type: "EDIT_POST",
    payload
  };
};

export const editPostSuccess = payload => {
  return {
    type: "EDIT_POST_SUCCESS",
    payload
  };
};

export const pinPost = payload => {
  return {
    type: "PIN_POST",
    payload
  };
};

export const getPinPost = payload => {
  return {
    type: "GET_PIN_POST",
    payload
  };
};

export const getPinPostSuccess = payload => {
  return {
    type: "GET_PIN_POST_SUCCESS",
    payload
  };
};

export const setPinnedData = payload => {
  return {
    type: "SET_PINNED_DATA",
    payload
  };
};

export const updateSaveChallengeRef = payload => {
  return {
    type: "UPDATE_SAVE_CH_REF",
    payload
  };
};