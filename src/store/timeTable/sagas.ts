import { call, put, takeLatest } from 'redux-saga/effects';
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
import { TimeTableAction, TimeTableActionType } from './constants';
import {
  addSubjectToTimeTable,
  deleteSubjectFromTimeTable,
  getCalendar,
  getTimeTableByGroup,
  getTimeTableBySpecialty,
  getTimeTableByYear,
  moveSubjectInTimeTable,
} from '~/src/api/timeTable/requests';

export function* timeTableWatcher() {
  yield takeLatest(TimeTableActionType.GetTimeTableByGroupRequest, getTimeTableByGroupWorker);
  yield takeLatest(TimeTableActionType.GetTimeTableByYearRequest, getTimeTableByYearWorker);
  yield takeLatest(TimeTableActionType.GetTimeTableBySpecialtyRequest, getTimeTableBySpecialtyWorker);
  yield takeLatest(TimeTableActionType.GetCalendarRequest, getCalendarWorker);
  yield takeLatest(TimeTableActionType.AddSubjectToTimeTableRequest, addSubjectToTimeTableWorker);
  yield takeLatest(TimeTableActionType.DeleteSubjectFromTimeTableRequest, deleteSubjectFromTimeTableWorker);
  yield takeLatest(TimeTableActionType.MoveSubjectInTimeTableRequest, moveSubjectInTimeTableWorker);
}

export function* getTimeTableByGroupWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.GetTimeTableByGroupRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(getTimeTableByGroup, action.group, action.year);
        yield put(getTimeTableSuccess(data));
      } catch (error: any) {
        yield put(getTimeTableFail(error?.message));
      }
    }
  }
}

export function* getTimeTableByYearWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.GetTimeTableByYearRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(getTimeTableByYear, action.year);
        yield put(getTimeTableSuccess(data));
      } catch (error: any) {
        yield put(getTimeTableFail(error?.message));
      }
    }
  }
}

export function* getTimeTableBySpecialtyWorker(action: TimeTableAction) {
  if (action.type === TimeTableActionType.GetTimeTableBySpecialtyRequest) {
    const authStatus: LoggedStatus = yield call(waitForAuthStatus);
    if (authStatus === LoggedStatus.LoggedIn) {
      try {
        const { data } = yield call(getTimeTableBySpecialty, action.specialty);
        yield put(getTimeTableSuccess(data));
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
        yield put(deleteSubjectFromTimeTableSuccess());
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
        const { data } = yield call(moveSubjectInTimeTable, action.data);
        yield put(moveSubjectInTimeTableSuccess(data));
      } catch (error: any) {
        yield put(moveSubjectInTimeTableFail(error?.message));
      }
    }
  }
}
