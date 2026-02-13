import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import {
  addSubjectToTimeTableRequest,
  addSubjectToTimeTableFail,
  addSubjectToTimeTableSuccess,
  deleteSubjectFromTimeTableRequest,
  deleteSubjectFromTimeTableFail,
  deleteSubjectFromTimeTableSuccess,
  getCalendarRequest,
  getCalendarFail,
  getCalendarSuccess,
  getTimeTableRequest,
  getTimeTableFail,
  getTimeTableSuccess,
  moveSubjectInTimeTableRequest,
  moveSubjectInTimeTableFail,
  moveSubjectInTimeTableSuccess,
} from './reducer';
import { CalendarType, GroupTimeTable, MoveSuccessPayload } from './constants';
import {
  addSubjectToTimeTable,
  deleteSubjectFromTimeTable,
  getCalendar,
  getTimeTableByGroup,
  getTimeTableBySpecialty,
  getTimeTableByTeacher,
  getTimeTableByYear,
  moveSubjectInTimeTable,
} from '~/src/api/timeTable/requests';
import { userIdSelector } from '../auth/selectors';

export function* timeTableWatcher() {
  yield takeLatest(getTimeTableRequest.type, getTimeTableByGroupWorker);
  yield takeLatest(getCalendarRequest.type, getCalendarWorker);
  yield takeLatest(addSubjectToTimeTableRequest.type, addSubjectToTimeTableWorker);
  yield takeLatest(deleteSubjectFromTimeTableRequest.type, deleteSubjectFromTimeTableWorker);
  yield takeLatest(moveSubjectInTimeTableRequest.type, moveSubjectInTimeTableWorker);
}

export function* getTimeTableByGroupWorker(action: ReturnType<typeof getTimeTableRequest>) {
  if (action.type === getTimeTableRequest.type) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        let receivedData: GroupTimeTable[] = [];
        switch (action.payload.type) {
          case CalendarType.Group: {
            const { data } = yield call(getTimeTableByGroup, action.payload.group, action.payload.year);
            receivedData = data
            break;
          }
          case CalendarType.Specialty: {
            const { data } = yield call(getTimeTableBySpecialty, action.payload.specialty);
            receivedData = data
            break;
          }
          case CalendarType.Year: {
            const { data } = yield call(getTimeTableByYear, action.payload.year);
            receivedData = data
            break;
          } default: {
            const teacherId: string = yield select(userIdSelector);
            const { data } = yield call(getTimeTableByTeacher, teacherId);
            receivedData = data
            break;
          }

        }
        yield put(getTimeTableSuccess(receivedData));
      } catch (error: any) {
        yield put(getTimeTableFail(error?.message));
      }
    }
  }
}

export function* getCalendarWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);
  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data } = yield call(getCalendar);
      yield put(getCalendarSuccess(data));
    } catch (error: any) {
      yield put(getCalendarFail(error?.message));
    }
  }
}

export function* addSubjectToTimeTableWorker(action: ReturnType<typeof addSubjectToTimeTableRequest>) {
  if (action.type === addSubjectToTimeTableRequest.type) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(addSubjectToTimeTable, action.payload);
        yield put(addSubjectToTimeTableSuccess(data));
      } catch (error: any) {
        yield put(addSubjectToTimeTableFail(error?.message));
      }
    }
  }
}

export function* deleteSubjectFromTimeTableWorker(action: ReturnType<typeof deleteSubjectFromTimeTableRequest>) {
  if (action.type === deleteSubjectFromTimeTableRequest.type) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        yield call(deleteSubjectFromTimeTable, action.payload);
        yield put(deleteSubjectFromTimeTableSuccess(action.payload));
      } catch (error: any) {
        yield put(deleteSubjectFromTimeTableFail(error?.message));
      }
    }
  }
}

export function* moveSubjectInTimeTableWorker(action: ReturnType<typeof moveSubjectInTimeTableRequest>) {
  if (action.type === moveSubjectInTimeTableRequest.type) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(moveSubjectInTimeTable, action.payload.data);

        const successPayload: MoveSuccessPayload = {
          newCalendarPlace: data,
          oldCalendarPlace: action.payload.data,
          year: action.payload.year,
          group: action.payload.group,
        }

        yield put(moveSubjectInTimeTableSuccess(successPayload));
      } catch (error: any) {
        yield put(moveSubjectInTimeTableFail(error?.message));
      }
    }
  }
}
