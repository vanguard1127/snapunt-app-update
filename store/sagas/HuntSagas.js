import { setGlobalError } from "../actions/ErrorActions";
import { call, put } from 'redux-saga/effects';
import { huntService } from "../../services/HuntService";
import { saveHuntSuccess, saveHuntError, getHuntsSuccess, getHuntsError, setHunts, setHuntDetail, huntDetailSuccess, huntDetailError, joinHuntSuccess, joinHuntError, setHuntSnapOffs, huntSnapOffsSuccess, huntSnapOffsError } from "../actions/HuntActions";
import { setLoader, setFlashMessage } from "../actions/LoaderAction";
import NavigationService from "../../services/NavigationService";

export function* saveHunt({ payload }) {
    try {
      NavigationService.navigate("HostAHuntScreen")
      yield put(setFlashMessage("You will be notified once your hunt posted."));
      yield call( huntService.saveHunt , payload);
      yield put(setFlashMessage("Your hunt successfully posted."));
      yield put(saveHuntSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(setFlashMessage("Couldn't post your hunt."));
        yield put(saveHuntError(true));
      } else {
        yield put(setFlashMessage("Couldn't post your hunt."));
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(setLoader(false));
    }
  }


  export function* getHunts({ payload }) {
    try {
      var {data} = yield call( huntService.getHunts , payload);
      yield put(setHunts(data))
      yield put(getHuntsSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(getHuntsError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(setLoader(false));
    }
  }

  export function* huntDetail({ payload }) {
    try {
      var {data} = yield call( huntService.huntDetail , payload);
      yield put(setHuntDetail(data))
      yield put(huntDetailSuccess(true));
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(huntDetailError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(setLoader(false));
    }
  }

  export function* joinHunt({ payload }) {
    try {
      var {data} = yield call( huntService.joinHunt , payload)
      yield put(joinHuntSuccess(true))
      NavigationService.navigate("ViewHuntScreen", {uuid: data.uuid})
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(joinHuntError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(setLoader(false));
    }
  }

  export function* huntSnapOffs({ payload }) {
    try {
      var {data} = yield call( huntService.huntSnapOffs , payload)
      yield put(setHuntSnapOffs(data))
      yield put(huntSnapOffsSuccess(true))
    } catch (error) {
        console.log(error)
      if (error.response.status === 400) {
        yield put(huntSnapOffsError(true));
      } else {
        yield put(setGlobalError(true));
      }
    } finally {
        yield put(setLoader(false));
    }
  }