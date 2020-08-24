import { setGlobalError } from "../actions/ErrorActions";
import { call, put } from 'redux-saga/effects';
import { setSavedChallenges, getSavedChallengesSuccess, getSavedChallengesError } from "../actions/MyChallengeActions";
import { myChallengeService } from "../../services/MyChallengeService";

export function* getSavedChallenges({ payload }) {
    try {
      var {data} = yield call( myChallengeService.getSeason1Data , payload);
      // data = [...data, { loading: true }];
      yield put( setSavedChallenges(data));
      yield put(getSavedChallengesSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getSavedChallengesError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(getSavedChallengesError(true));
    }
  }