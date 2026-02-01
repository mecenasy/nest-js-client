import { call, put, takeLatest } from 'redux-saga/effects';
import { getStudentData } from '~/src/api/panelMenu/requests';
import { getStudentFail, getStudentSuccess } from './actions';
import { UniversityAction, UniversityActionType } from './constants';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';

export function* getUniversityWatcher() {
  yield takeLatest<UniversityAction>(UniversityActionType.GetUniversityRequest, getUniversityWorker);
}

export function* getUniversityWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: { data: any } = yield call(getStudentData);

      yield put(getStudentSuccess(data));
    } catch (error) {
      yield put(getStudentFail(''));
    }
  }
}

