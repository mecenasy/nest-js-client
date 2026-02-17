import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import * as A from './reducer';
import {
  addGrades,
  getStudentGrades,
  getTeacherGrades,
  removeGrade,
  updateGrades,
} from '~/src/api/grade/requests';
import axios from 'axios';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import { userIdSelector } from '../auth/reducers';
import { CreateGrade } from './constants';

function* addGradesWorker({ payload }: ReturnType<typeof A.addGradesRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {

      const userId: string = yield select(userIdSelector);

      const { data } = yield call(
        addGrades,
        payload.toAdd.map<CreateGrade>(grade => ({ ...grade, teacherId: userId }))
      );
      yield put(A.addGrades(data));
      yield call(payload.resolve);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.addGradesFail(error.message));
        yield call(payload.reject);
      }
    }
  }
}

function* updateGradesWorker({ payload }: ReturnType<typeof A.updateGradesRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    const userId: string = yield select(userIdSelector);

    try {
      const { data } = yield call(updateGrades, payload.toUpdate);
      yield put(A.updateGrades(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.updateGradesFail(error.message));
      }
    }
  }
}

function* removeGradesWorker({ payload }: ReturnType<typeof A.removeGradeRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      yield call(removeGrade, payload);
      yield put(A.removeGrade(payload));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.removeGradeFail(error.message));
      }
    }
  }
}

function* getTeacherGradesWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    const userId: string = yield select(userIdSelector);

    try {
      const { data } = yield call(getTeacherGrades, userId);
      yield put(A.getTeacherGrades(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getTeacherGradesFail(error.message));
      }
    }
  }
}

function* getStudentGradesWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    const userId: string = yield select(userIdSelector);
    try {
      const { data } = yield call(getStudentGrades, userId);
      yield put(A.getStudentsGrades(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getStudentsGradesFail(error.message));
      }
    }
  }
}

export function* gradeSagaWatcher() {
  yield all([
    takeLatest(A.getTeacherGradesRequest.type, getTeacherGradesWorker),
    takeLatest(A.updateGradesRequest.type, updateGradesWorker),
    takeLatest(A.removeGradeRequest.type, removeGradesWorker),
    takeLatest(A.addGradesRequest.type, addGradesWorker),
    takeLatest(A.getStudentsGradesRequest.type, getStudentGradesWorker),
  ]);
}
