import { call, put, select, takeLatest } from 'redux-saga/effects';
import { addPerson, getPersonByUserId } from '../../api/person/requests';
import { getPersonSuccess, getPersonFail, addPersonSuccess } from './actions';
import { PersonAction, Person, PersonActionType } from './constants';
import { userIdSelector } from '../auth/selectors';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { AxiosResponse } from 'axios';

export function* getPersonWatcher() {
  yield takeLatest<PersonAction>(PersonActionType.GetPersonRequest, getPersonWorker);
}

export function* getPersonWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const personId: string = yield select(userIdSelector);
      try {
        if (personId) {

          const { data }: { data: Person } = yield call(getPersonByUserId);

          yield put(getPersonSuccess(personId, data));
        }
      } catch {
        yield put(getPersonFail(personId, ''));
      }

    } catch {

    }
  }
}

export function* addPersonWatcher() {
  yield takeLatest<PersonAction>(PersonActionType.AddPersonRequest, addPersonWorker);
}

export function* addPersonWorker(action: PersonAction) {
  if (action.type === PersonActionType.AddPersonRequest) {
    try {
      const personToAdd: any = action.person;
      const { data }: AxiosResponse<Person> = yield call(addPerson, personToAdd);


      yield put(addPersonSuccess(data));
    } catch {
      yield put(getPersonFail('action.person?.id', ''));
    }
  }
} 