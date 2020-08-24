import { followSuccess, followError, acceptRequestSuccess, acceptRequestError, cancelRequestError, cancelRequestSuccess, setFriends, getFriendSuccess, getFriendError, setActivityData, activityDataSuccess, activityDataError, setFollowers, getFollowersSuccess, getFollowersError, setFollowings, getFollowingsSuccess, getFollowingsError, setActivities, getActivitiesSuccess, getActivitiesError } from "../actions/FollowActions";
import { setGlobalError } from "../actions/ErrorActions";
import { followService } from "../../services/FollowService";
import { setFlashMessage } from "../actions/LoaderAction";
import { call, put } from 'redux-saga/effects';

export function* follow({ payload }) {
    try {
      const { data } = yield call( followService.follow, payload);
      yield put(setFlashMessage(data.message));
      yield put(followSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(followError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(followError(true));
    }
  }

  export function* acceptRequest({ payload }) {
    try {
      const { data } = yield call( followService.accept, payload);
      yield put(setFlashMessage(data.message));
      yield put(acceptRequestSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(acceptRequestError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(acceptRequestError(true));
    }
  }

  export function* cancelRequest({ payload }) {
    try {
      const { data } = yield call( followService.cancel, payload);
      yield put(setFlashMessage(data.message));
      yield put(cancelRequestSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(cancelRequestError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(cancelRequestError(true));
    }
  }

  export function* getFriends({ payload }) {
    try {
      const { data } = yield call( followService.getFriends, payload);
      yield put(setFriends(data));
      yield put(getFriendSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getFriendError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(getFriendError(true));
    }
  }

  export function* getActivity({ payload }) {
    try {
      const { data } = yield call( followService.getActivity, payload);
      yield put(setActivityData(data));
      yield put(activityDataSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(activityDataError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
    }
  }

  export function* getFollowers({ payload }) {
    try {
      const { data } = yield call( followService.getFollowers, payload);
      yield put(setFollowers(data));
      yield put(getFollowersSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getFollowersError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
    }
  }

  export function* getFollowings({ payload }) {
    try {
      const { data } = yield call( followService.getFollowings, payload);
      yield put(setFollowings(data));
      yield put(getFollowingsSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getFollowingsError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
    }
  }

  // fetch only activies to show under acticvies tab inside activity screen
  export function* getActivities({ payload }) {
    try {
      const { data } = yield call( followService.getActivities, payload);
      yield put(setActivities(data));
      yield put(getActivitiesSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getActivitiesError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
    }
  }