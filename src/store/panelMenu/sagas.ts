import { call, put, takeLatest } from 'redux-saga/effects';
import { addMenuItem, getMenu, removeMenuItem } from '~/src/api/panelMenu/requests';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import * as A from './reducers';
import axios from 'axios';
import { MenuItem } from './constants';

export function* menuItemsWatcher() {
  yield takeLatest(A.getMenuItemsRequest.type, getMenuWorker);
  yield takeLatest(A.addMenuItemsRequest.type, setMenuWorker);
  yield takeLatest(A.removeMenuItemsRequest.type, removeMenuWorker);
}

export function* getMenuWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data } = yield call(getMenu);

      yield put(A.getMenuItemsSuccess(data));
    } catch (error: any) {
      yield put(A.getMenuItemsFail(error));
    }
  }
}

export function* setMenuWorker(action: ReturnType<typeof A.addMenuItemsRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: { data: MenuItem } = yield call(addMenuItem, action.payload);

      yield put(A.addMenuItemsSuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.addMenuItemsFail(error.message));
      }
    }
  }
}

export function* removeMenuWorker(action: ReturnType<typeof A.removeMenuItemsRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      yield call(removeMenuItem, action.payload);

      yield put(A.removeMenuItemsSuccess(action.payload));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.removeMenuItemsFail(error.message));
      }
    }
  }
}
