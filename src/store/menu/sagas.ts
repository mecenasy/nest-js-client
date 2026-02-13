import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getMenu } from '../../api/menu/requests';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { userIdSelector } from '../auth/selectors';
import { getMenuFail, getMenuSuccess, getMenuRequest } from './reducers';

export function* getMenuWatcher() {
  yield takeLatest(getMenuRequest.type, getMenuWorker);
}

export function* getMenuWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    const personId: string = yield select(userIdSelector);
    try {
      if (personId) {

        const { data } = yield call(getMenu);

        yield put(getMenuSuccess(data));
      }
    } catch {
      yield put(getMenuFail());
    }
  }
}
