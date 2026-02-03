import { call, fork, put, select, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { PaginationFilter, SelectedFilters, UserListState, UserListAction, UserListActionType } from './constants';
import { getUserListFail, getUserListSuccess } from './actions';
import { getSelectedFilters } from './selectors';
import { getUsers } from '~/src/api/userlist/requests';
import { replace } from 'connected-react-router';

export function* getUserListWatcher() {
  yield takeLatest<
    ExtractByType<UserListAction, UserListActionType.GetUserListRequest>
  >(UserListActionType.GetUserListRequest, getUserListWorker);
  yield fork(getUserListParamsWatcher)
}

export function* getUserListParamsWatcher() {
  yield takeLatest<UserListAction>(UserListActionType.SetFilter, getUserListParamsWorker);
  yield takeLatest<UserListAction>(UserListActionType.SetPage, getUserListParamsWorker);
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
  })

  const searchParam = new URLSearchParams(convertedParams).toString();
  yield put(replace({ search: searchParam }))
}

export function* getUserListWorker({
  searchParam,
  listType
}: ExtractByType<UserListAction, UserListActionType.GetUserListRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {

    try {
      const { data }: { data: UserListState } = yield call(getUsers, searchParam ?? '', listType);

      yield put(getUserListSuccess(data));
    } catch (error) {
      yield put(getUserListFail(''));
    }
  }
}