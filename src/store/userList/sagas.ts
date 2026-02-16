import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { PaginationFilter, SelectedFilters, UserListState, ListType } from './constants';
import {
  getSimpleUserListSuccess,
  getUserListFail,
  getUserListSuccess,
  getUserListRequest,
  getSimpleUserListRequest,
  setFilter,
  setPage,
  getSelectedFilters,
} from './reducer';
import { getSimpleUsers, getUsers } from '~/src/api/userlist/requests';
import { replace } from 'redux-first-history';
import { SimplePerson } from '../person/constants';
import { userRoleSelector } from '../auth/reducers';
import axios from 'axios';

export function* getUserListWatcher() {
  yield takeLatest(getUserListRequest.type, getUserListWorker);
  yield fork(getUserListParamsWatcher);
  yield takeLatest(getSimpleUserListRequest.type, getSimpleUserListWorker);
  yield fork(getUserListParamsWatcher);
}

export function* getUserListParamsWatcher() {
  yield takeLatest(setFilter.type, getUserListParamsWorker);
  yield takeLatest(setPage.type, getUserListParamsWorker);
}
export function* getUserListParamsWorker() {
  const params: SelectedFilters & PaginationFilter = yield select(getSelectedFilters);

  const convertedParams: Record<string, string> = {};
  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (Array.isArray(params[key])) {
      convertedParams[key] = (params[key] as string[]).join(',');
    } else if (params[key]) {
      convertedParams[key] = params[key] as string;
    }
  });

  const searchParam = new URLSearchParams(convertedParams).toString();
  yield put(replace({ search: searchParam }));
}

export function* getUserListWorker(action: ReturnType<typeof getUserListRequest>) {
  const { searchParam, listType } = action.payload;
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: { data: UserListState } = yield call(getUsers, searchParam ?? '', listType);

      yield put(getUserListSuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(getUserListFail(error.message));
      }
    }
  }
}
export function* getSimpleUserListWorker(action: ReturnType<typeof getSimpleUserListRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    const type: ListType = yield select(userRoleSelector);
    try {
      const { data }: { data: SimplePerson[] } = yield call(getSimpleUsers, action.payload ?? type);

      yield put(getSimpleUserListSuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(getUserListFail(error.message));
      }
    }
  }
}
