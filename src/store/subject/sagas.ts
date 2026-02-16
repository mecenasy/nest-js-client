import { call, put, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import * as A from './reducer';
import { addSubject, deleteSubject, getSubjects, updateSubject } from '~/src/api/subject/requests';
import axios from 'axios';

export function* subjectWatcher() {
  yield takeLatest(A.getSubjectsRequest.type, getSubjectsWorker);
  yield takeLatest(A.addSubjectRequest.type, addSubjectWorker);
  yield takeLatest(A.deleteSubjectRequest.type, deleteSubjectWorker);
  yield takeLatest(A.updateSubjectRequest.type, updateSubjectWorker);
}

export function* getSubjectsWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);
  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data } = yield call(getSubjects);
      yield put(A.getSubjects(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getSubjectsFail(error.message));
      }
    }
  }
}

export function* addSubjectWorker(action: ReturnType<typeof A.addSubjectRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);
  if (authStatus === LoggedStatus.LoggedIn) {
    const { subject, resolve, reject } = action.payload;
    try {
      const { data } = yield call(addSubject, subject);
      yield put(A.addSubject(data));
      yield call(resolve, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield call(reject);
        yield put(A.addSubjectFail(error.message));
      }
    }
  }
}

export function* deleteSubjectWorker(action: ReturnType<typeof A.deleteSubjectRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);
  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const id = action.payload;
      yield call(deleteSubject, id);
      yield put(A.deleteSubject(id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.deleteSubjectFail(error.message));
      }
    }
  }
}

export function* updateSubjectWorker(action: ReturnType<typeof A.updateSubjectRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);
  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data } = yield call(updateSubject, action.payload);
      yield put(A.updateSubject(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.updateSubjectFail(error.message));
      }
    }
  }
}
