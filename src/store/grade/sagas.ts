import { all, call, put, takeLatest } from 'redux-saga/effects';
import * as A from './reducer';
import { addGrades, getStudentGrades, getTeacherGrades, removeGrade, updateGrades } from '~/src/api/grade/requests';

function* addGradesWorker({ payload }: ReturnType<typeof A.addGradesRequest>) {
  try {
    const { data } = yield call(addGrades, payload);
    yield put(A.addGrades(data));
  } catch {
  }
}

function* updateGradesWorker({ payload }: ReturnType<typeof A.updateGradesRequest>) {
  try {
    const { data } = yield call(updateGrades, payload);
    yield put(A.updateGrades(data));
  } catch {
  }
}

function* removeGradesWorker({ payload }: ReturnType<typeof A.removeGradeRequest>) {
  try {
    yield call(removeGrade, payload);
    yield put(A.removeGrade(payload));
  } catch {
  }
}

function* getTeacherGradesWorker() {
  try {
    const { data } = yield call(getTeacherGrades);
    yield put(A.getTeacherGrades(data));
  } catch {
  }
}

function* getStudentGradesWorker() {
  try {
    const { data } = yield call(getStudentGrades);
    yield put(A.getStudentsGrades(data));
  } catch {
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
