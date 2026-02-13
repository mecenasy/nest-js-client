import { call, put, select, takeLatest } from 'redux-saga/effects';
import { addPerson, getPersonByUserId } from '../../api/person/requests';
import { getPersonSuccess, addPersonSuccess, getPersonRequest, addPersonRequest } from './reducer';
import { Person } from './constants';
import { userIdSelector } from '../auth/selectors';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { AxiosResponse } from 'axios';

export function* getPersonWatcher() {
  yield takeLatest(getPersonRequest.type, getPersonWorker);
}

export function* getPersonWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const personId: string = yield select(userIdSelector); ``
      try {
        if (personId) {

          const { data }: { data: Person } = yield call(getPersonByUserId);

          yield put(getPersonSuccess({ userId: personId, person: data }));
        }
      } catch {
      }
    } catch {
    }
  }
}

export function* addPersonWatcher() {
  yield takeLatest(addPersonRequest.type, addPersonWorker);
}

export function* addPersonWorker(action: ReturnType<typeof addPersonRequest>) {
  if (action.type === addPersonRequest.type) {
    try {
      const personToAdd: any = action.payload;
      const { data }: AxiosResponse<Person> = yield call(addPerson, personToAdd);

      yield put(addPersonSuccess(data));
    } catch {
    }
  }
} 