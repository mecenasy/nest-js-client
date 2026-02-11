import { call, put, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import {
  addSubjectFail,
  addSubjectSuccess,
  deleteSubjectFail,
  deleteSubjectSuccess,
  getSubjectsFail,
  getSubjectsSuccess,
  updateSubjectFail,
  updateSubjectSuccess,
} from './actions';
import { SubjectAction, SubjectActionType } from './constants';
import {
  addSubject,
  deleteSubject,
  getSubjects,
  updateSubject,
} from '~/src/api/subject/requests';

export function* subjectWatcher() {
  yield takeLatest(SubjectActionType.GetSubjectsRequest, getSubjectsWorker);
  yield takeLatest(SubjectActionType.AddSubjectRequest, addSubjectWorker);
  yield takeLatest(SubjectActionType.DeleteSubjectRequest, deleteSubjectWorker);
  yield takeLatest(SubjectActionType.UpdateSubjectRequest, updateSubjectWorker);
}

export function* getSubjectsWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);
  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data } = yield call(getSubjects);
      yield put(getSubjectsSuccess(data));
    } catch (error: any) {
      yield put(getSubjectsFail(error?.message));
    }
  }
}

export function* addSubjectWorker(action: SubjectAction) {
  if (action.type === SubjectActionType.AddSubjectRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(addSubject, action.subject);
        yield put(addSubjectSuccess(data));
        yield call(action.resolve, data)
      } catch (error: any) {
        yield put(addSubjectFail(error?.message));
        yield call(action.reject)
      }
    }
  }
}

export function* deleteSubjectWorker(action: SubjectAction) {
  if (action.type === SubjectActionType.DeleteSubjectRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        yield call(deleteSubject, action.id);
        yield put(deleteSubjectSuccess(action.id));
      } catch (error: any) {
        yield put(deleteSubjectFail(error?.message));
      }
    }
  }
}

export function* updateSubjectWorker(action: SubjectAction) {
  if (action.type === SubjectActionType.UpdateSubjectRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(updateSubject, action.subject);
        yield put(updateSubjectSuccess(data));
      } catch (error: any) {
        yield put(updateSubjectFail(error?.message));
      }
    }
  }
}