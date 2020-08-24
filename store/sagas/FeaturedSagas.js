import { setGlobalError } from "../actions/ErrorActions";
import { call, put } from 'redux-saga/effects';
import { sponsorService } from "../../services/SponsorService";
import { setSponsorChallenges, getSponsorChallengesSuccess, getSponsorChallengesError } from "../actions/SponsorActions";
import { featuredService } from "../../services/FeaturedService";
import { setFeaturedChallenges, getFeaturedChallengesSuccess } from "../actions/FeaturedActions";
import { setFlashMessage } from "../actions/LoaderAction";

export function* getFeaturedChallenges({ payload }) {
    try {
      var {data} = yield call( featuredService.getFeaturedChallenges , payload);
      yield put( setFeaturedChallenges(data));
      yield put(getFeaturedChallengesSuccess(true));
    } catch (error) {
        yield put(setFlashMessage("Could'nt fetch featured challenges."));
    }
  }