import { season1Service } from "../../services/Season1Service";
import { setSeason1Data, getSeason1DataSuccess, getSeason1DataError } from "../actions/Season1Actions";
import { setGlobalError } from "../actions/ErrorActions";
import { call, put } from 'redux-saga/effects';

export function* getSeason1Data({ payload }) {
    try {
      var {data} = yield call(season1Service.getSeason1Data, payload);
      // data = [...data, { loading: true }];
      yield put( setSeason1Data(data));
      yield put(getSeason1DataSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getSeason1DataError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(getSeason1DataError(true));
    }
  }