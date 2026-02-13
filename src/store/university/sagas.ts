import { call, put, takeLatest } from 'redux-saga/effects';
import { getStudentData } from '~/src/api/panelMenu/requests';
import { getUniversitySuccess, getUniversityRequest } from './reducer';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';

export function* getUniversityWatcher() {
  yield takeLatest(getUniversityRequest.type, getUniversityWorker);
}

export function* getUniversityWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: { data: any } = yield call(getStudentData);

      yield put(getUniversitySuccess(data));
    } catch {
    }
  }
}
