import { call, put, takeLatest } from 'redux-saga/effects';
import { getRole } from '~/src/api/panelMenu/requests';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { getRoleFail, getRoleSuccess } from './reducer';
import { getRoleRequest } from './reducer';
import axios from 'axios';

export function* getRoleWatcher() {
  yield takeLatest(getRoleRequest.type, getRoleWorker);
}

export function* getRoleWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: { data: string[] } = yield call(getRole);

      yield put(getRoleSuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(getRoleFail(error.message));
      }
    }
  }
}
