import { call, put, select, takeLatest } from 'redux-saga/effects';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';
import {
  addSubjectToTimeTableFail,
  addSubjectToTimeTableSuccess,
  deleteSubjectFromTimeTableFail,
  deleteSubjectFromTimeTableSuccess,
  getCalendarFail,
  getCalendarSuccess,
  getTimeTableFail,
  getTimeTableSuccess,
  moveSubjectInTimeTableFail,
  moveSubjectInTimeTableSuccess,
} from './actions';
import { CalendarType, GroupTimeTable, MoveSuccessPayload, TimeTableAction, TimeTableActionType } from './constants';
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
  yield takeLatest(TimeTableActionType.GetTimeTableRequest, getTimeTableByGroupWorker);
  yield takeLatest(TimeTableActionType.GetCalendarRequest, getCalendarWorker);
  yield takeLatest(TimeTableActionType.AddSubjectToTimeTableRequest, addSubjectToTimeTableWorker);
  yield takeLatest(TimeTableActionType.DeleteSubjectFromTimeTableRequest, deleteSubjectFromTimeTableWorker);
  yield takeLatest(TimeTableActionType.MoveSubjectInTimeTableRequest, moveSubjectInTimeTableWorker);
}

export function* getTimeTableByGroupWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.GetTimeTableRequest) {
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

export function* addSubjectToTimeTableWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.AddSubjectToTimeTableRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(addSubjectToTimeTable, action.data);
        yield put(addSubjectToTimeTableSuccess(data));
      } catch (error: any) {
        yield put(addSubjectToTimeTableFail(error?.message));
      }
    }
  }
}

export function* deleteSubjectFromTimeTableWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.DeleteSubjectFromTimeTableRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        yield call(deleteSubjectFromTimeTable, action.data);
        yield put(deleteSubjectFromTimeTableSuccess(action.data));
      } catch (error: any) {
        yield put(deleteSubjectFromTimeTableFail(error?.message));
      }
    }
  }
}

export function* moveSubjectInTimeTableWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.MoveSubjectInTimeTableRequest) {
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
