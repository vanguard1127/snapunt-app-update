import { setLoader, setFlashMessage } from "../actions/LoaderAction";
import { searchUsersSuccess, searchUsersError, setSearchUsers, setSearchResults, searchResultsSuccess, searchResultsError, setFlatResults, flatResultsSuccess, flatResultsError, setDiscoverData, discoverDataSuccess, discoverDataError, setCategoryData, setCategorySuccess, categoryError, setFlatCatData, flatCatDataSuccess } from "../actions/DiscoverActions";
import {
  setGlobalError,
} from '../actions/ErrorActions';
import { discoverService } from "../../services/DiscoverService";
import { call, put } from 'redux-saga/effects';

export function* searchUsers({ payload }) {
  try {
    const { data } = yield call(discoverService.searchUsers, payload);
    yield put(setSearchUsers(data));
    yield put(searchUsersSuccess(true));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(searchUsersError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* getSearchResults({ payload }) {
  try {
    const { data } = yield call(discoverService.getSearchResults, payload);
    yield put(setSearchResults(data));
    yield put(searchResultsSuccess(true));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(searchResultsError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}

export function* getFlatResults({ payload }) {
  try {
    const { data } = yield call(discoverService.getFlatResults, payload);
    yield put(setFlatResults(data));
    yield put(flatResultsSuccess(true));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(flatResultsError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(setLoader(false));
  }
}


export function* getDiscoverData({ payload }) {
  try {
    const { data } = yield call(discoverService.getDiscoverData, payload);
    yield put(setDiscoverData(data));
    yield put(discoverDataSuccess(true));
  } catch (error) {
    if (error.response.status === 400) {
      yield put(discoverDataError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(discoverDataError(true));
  }
}

export function* getFlatCatData({ payload }) {
  try {
    const { data } = yield call(discoverService.getFlatCatData, payload);
    yield put(setFlatCatData(data));
    yield put(flatCatDataSuccess(true));
  } catch (error) {
    yield put(setFlashMessage("Could'nt fetch data"));
  }
}

export function* getCategoryData({ payload }) {
  try {
    const { data } = yield call(discoverService.getCategoryData, payload);
    yield put(setCategoryData(data));
    yield put(setCategorySuccess(true));
  } catch (error) {
    console.log(error)
    if (error.response.status === 400) {
      yield put(categoryError(true));
    } else {
      yield put(setGlobalError(true));
    }
  } finally {
    yield put(categoryError(true));
  }
}