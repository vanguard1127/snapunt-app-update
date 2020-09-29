import { saveChallengeSuccess, saveChallengeError, addClapSuccess, addClapError, addCommentSuccess, addCommentError, getCommentsSuccess, getCommentsError, setComments, clappedUsersSuccess, setClappedUsers, editPostSuccess, setPinnedData } from "../actions/ChallengeActions";
import { challengeService } from "../../services/ChallengeService";
import { call, put } from 'redux-saga/effects';
import { setLoader, setRefreshLoading, setFlashMessage } from '../actions/LoaderAction';
import { setLoadingText, setUpdatedUser } from "../actions/UserActions";
import NavigationService from "../../services/NavigationService";

export function* saveChallenge({ payload }) {
    try {
      yield put(setLoader(true));
      // yield(put(setLoadingText("Posting Challenge")))
      var {data} = yield call(challengeService.saveChallenge , payload);
      yield put(setUpdatedUser(data))
      yield put(saveChallengeSuccess(true));
      if(payload.clearData != undefined){
        var clearData = payload.clearData
        NavigationService.resetNav(clearData.stack, clearData.screen)
        NavigationService.navigate(clearData.navigateTo, clearData.navigationData)
      }else if (payload.is_draft){
        NavigationService.resetNav("CameraStack", "CameraScreen")
        NavigationService.navigate("Profile", {refresh: true})
      }else{
          // new post
          NavigationService.resetNav("CameraStack", "CameraScreen")
          NavigationService.navigate("Home")
        }
    } catch (error) {
        alert(error)
        console.log(error)
      if (error.response.status === 400) {        
        yield put(saveChallengeError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* addClap({ payload }) {
    try {
      yield call(challengeService.addClap , payload);
      yield put(addClapSuccess(true));
    } catch (error) {
      if (error.response.status === 400) {
        yield put(addClapError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* pinPost({ payload }) {
    try {
      yield put(setLoader(true));
      yield call(challengeService.pinPost , payload);
      yield put(setFlashMessage("Post has been pinned"));
    } catch (error) {
        yield put(setFlashMessage("Could'nt pin post, Try Again!"));
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* getPinPost({ payload }) {
    try {
      var {data} = yield call(challengeService.getPinPost , payload);
      yield put(setPinnedData(data));
      yield put(getPinPostSuccess(true));
    } catch (error) {
        yield put(setFlashMessage("Could'nt get pinned post."));
    } finally {
      yield put(setLoader(false));
    }
  }


  export function* editPost({ payload }) {
    try {
      yield call(challengeService.editPost , payload);
      yield put(setFlashMessage("Successfully updated post description!"));
      yield put(editPostSuccess(true))
    } catch (error) {
      yield put(setFlashMessage("Something went wrong!"));
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* clappedUsers({ payload }) {
    try {
      var {data} = yield call(challengeService.clappedUsers , payload);
      yield put(setClappedUsers(data));
      yield put(clappedUsersSuccess(true));
    } catch (error) {
        yield put(setFlashMessage("Something went wrong!"));
    } finally {
      yield put(setLoader(false));
    }
  }


  export function* deleteDraft({ payload }) {
    try {
      yield put(setLoader(true));
      yield call(challengeService.deleteDraft , payload);
      NavigationService.navigate("Profile", {refresh: true})
    } catch (error) {
      if (error.response.status === 400) {
        yield put(setFlashMessage("Could'nt delete post."));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* report({ payload }) {
    try {
      yield put(setLoader(true));
      yield call(challengeService.report , payload);
      yield put(setFlashMessage("Successfully Reported!"));
    } catch (error) {
      if (error.response.status === 400) {
        yield put(setFlashMessage("Something went wrong."));
      } else {
        yield put(setFlashMessage("Something went wrong."));
      }
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* addComment({ payload }) {
    try {
      yield call(challengeService.addComment , payload);
      yield put(addCommentSuccess(true));
    } catch (error) {
      if (error.response.status === 400) {
        yield put(addCommentError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
      yield put(setLoader(false));
    }
  }

  export function* getComments({ payload }) {
    try {
      var { data } =  yield call(challengeService.getComments , payload);
      yield put( setComments(data))
      yield put(getCommentsSuccess(true));
      yield put(setRefreshLoading(false));
    } catch (error) {
      if (error.response.status === 400) {
        yield put(getCommentsError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
      yield put(setLoader(false));
    }
  }