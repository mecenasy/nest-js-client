import { call, put, select, takeLatest } from 'redux-saga/effects';
import { addPerson, getPersonByUserId } from '../../api/person/requests';
import { getPersonSuccess, getPersonFail, addPersonSuccess } from './actions';
import { PersonAction, Person, PersonActionType, PersonFormData } from './constants';
import { getPersonId } from '../auth/selectors';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { AxiosResponse } from 'axios';

export function* getPersonWatcher() {
  yield takeLatest<PersonAction>(PersonActionType.GetPersonRequest, getPersonWorker);
}

export function* getPersonWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {

    const personId: string = yield select(getPersonId);
    try {
      if (personId) {

        const { data }: { data: Person } = yield call(getPersonByUserId, personId);

        yield put(getPersonSuccess(personId, data));
      }
    } catch (error) {
      yield put(getPersonFail(personId, ''));
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
    } catch (error) {
      yield put(getPersonFail('action.person?.id', ''));
    }
  }
} 