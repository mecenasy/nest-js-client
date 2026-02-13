import { call, put, takeLatest } from 'redux-saga/effects';
import { getStudentData } from '~/src/api/panelMenu/requests';
import { getUniversitySuccess, getUniversityRequest, getUniversityFail } from './reducer';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { UniversityState } from './constants';
import axios from 'axios';

export function* getUniversityWatcher() {
  yield takeLatest(getUniversityRequest.type, getUniversityWorker);
}

export function* getUniversityWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: { data: UniversityState } = yield call(getStudentData);

      yield put(getUniversitySuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(getUniversityFail(error.message));
      }
    }
  }
}
