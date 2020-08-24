import { setGlobalError } from "../actions/ErrorActions";
import { call, put } from 'redux-saga/effects';
import { homeService } from "../../services/HomeService";
import { homeDataSuccess, homeDataError, setHomeData } from "../actions/HomeActions";

export function* fetchHomeData({ payload }) {
    try {
      const { data } = yield call( homeService.fetchHomeData, payload);
      yield put(setHomeData(data));
      yield put(homeDataSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(homeDataError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(homeDataError(true));
    }
  }