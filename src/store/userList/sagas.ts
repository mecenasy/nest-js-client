import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { SelectedFilters, UserList, UserListAction, UserListActionType } from './constants';
import { getUserListFail, getUserListSuccess } from './actions';
import { getParamsList } from './selectors';
import { getUsers } from '~/src/api/userlist/requests';

export function* getUserListWatcher() {
  yield takeLatest<UserListAction>(UserListActionType.GetUserListRequest, getUserListWorker);
}

export function* getUserListWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {

    try {

      const params: SelectedFilters = yield select(getParamsList);
      try {
        if (params) {

          const { data }: { data: UserList } = yield call(getUsers, params);

          yield put(getUserListSuccess(data));
        }
      } catch (error) {
        yield put(getUserListFail(''));
      }

    } catch (error) {

    }
  }
}
