import { setGlobalError } from "../actions/ErrorActions";
import { call, put } from 'redux-saga/effects';
import { sponsorService } from "../../services/SponsorService";
import { setSponsorChallenges, getSponsorChallengesSuccess, getSponsorChallengesError, setSponsorPosts, getSponsorPostsError, getSponsorPostsSuccess } from "../actions/SponsorActions";

export function* getSponsorChallenges({ payload }) {
    try {
      var {data} = yield call( sponsorService.getSponsorChallenges , payload);
      // data = [...data, { loading: true }];
      yield put( setSponsorChallenges(data));
      yield put(getSponsorChallengesSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getSponsorChallengesError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(getSponsorChallengesError(true));
    }
  }

  export function* getSponsorPosts({ payload }) {
    try {
      var {data} = yield call( sponsorService.getSponsorPosts , payload);
      // data = [...data, { loading: true }];
      yield put( setSponsorPosts(data));
      yield put(getSponsorPostsSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getSponsorPostsError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(getSponsorPostsError(true));
    }
  }