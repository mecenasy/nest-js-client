import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getMenu } from '../../api/menu/requests';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { getUserId, userRoleSelector } from '../auth/selectors';
import { RoleType } from '../role/constants';
import { getMenuFail, getMenuSuccess } from './actions';
import { MenuActionType } from './constants';
import { AxiosError } from 'axios';

export function* getMenuWatcher() {
  yield takeLatest(MenuActionType.GetMenuRequest, getMenuWorker);
}

export function* getMenuWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    const personId: string = yield select(getUserId);
    try {
      if (personId) {

        const { data } = yield call(getMenu);

        yield put(getMenuSuccess(data));
      }
    } catch (error) {
      yield put(getMenuFail(error as AxiosError));
    }
  }
}
