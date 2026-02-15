import { call, put, select, takeLatest } from 'redux-saga/effects';
import { addPerson, getPersonByUserId } from '../../api/person/requests';
import * as A from './reducer';
import { Person } from './constants';
import { userIdSelector } from '../auth/reducers';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import axios, { AxiosResponse } from 'axios';

export function* personWatcher() {
  yield takeLatest(A.getPersonRequest.type, getPersonWorker);
  yield takeLatest(A.addPersonRequest.type, addPersonWorker);
}

export function* getPersonWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const personId: string = yield select(userIdSelector);
      if (personId) {

        const { data }: { data: Person } = yield call(getPersonByUserId);

        yield put(A.getPersonSuccess({ userId: personId, person: data }));
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getPersonFail(error.message));
      }
    }
  }
}

export function* addPersonWorker(action: ReturnType<typeof A.addPersonRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const personToAdd: any = action.payload;
      const { data }: AxiosResponse<Person> = yield call(addPerson, personToAdd);

      yield put(A.addPersonSuccess(data));
      yield call(action.payload.resolve, undefined);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.addPersonFail(error.message));
        yield call(action.payload.reject);
      }
    }
  }
} 