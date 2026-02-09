
export interface Calendar {
  days: string[];
  hours: string[];
}

export interface Subject {
  id: string;
  name: string;
}

export interface Teacher {
  id: string;
  name: string;
}

export interface CalendarPlace {
  hours: string;
  days: string;
  group: string;
  year: string;
  specialty: string;
  subject: Subject;
  teacher: Teacher;
  auditorium: string;
}

export interface GroupTimeTable {
  name: string;
  year: string;
  timeTable: CalendarPlace[];
}

export interface TimeTableState extends Calendar {
  groupsTable: GroupTimeTable[];
}

export const initialState: TimeTableState = {
  days: [],
  hours: [],
  groupsTable: []
}

export interface TimeTableData {
  hours: string;
  days: string;
  auditorium: string;
  group: string;
  year: string;
  specialty: string;
  subject: string;
  teacher: string;
}

export interface MoveTimeTableData extends TimeTableData {
  newHours: string;
  newDays: string;
  newAuditorium: string
}

export enum TimeTableActionType {
  GetTimeTableByGroupRequest = 'timeTable/GET_TIME_TABLE_BY_GROUP_REQUEST',
  GetTimeTableByYearRequest = 'timeTable/GET_TIME_TABLE_BY_YEAR_REQUEST',
  GetTimeTableBySpecialtyRequest = 'timeTable/GET_TIME_TABLE_BY_SPECIALTY_REQUEST',

  GetTimeTableSuccess = 'timeTable/GET_TIME_TABLE_SUCCESS',
  GetTimeTableFail = 'timeTable/GET_TIME_TABLE_FAIL',

  GetCalendarRequest = 'timeTable/GET_CALENDAR_REQUEST',
  GetCalendarSuccess = 'timeTable/GET_CALENDAR_SUCCESS',
  GetCalendarFail = 'timeTable/GET_CALENDAR_FAIL',

  AddSubjectToTimeTableRequest = 'timeTable/ADD_SUBJECT_TO_TIME_TABLE_REQUEST',
  AddSubjectToTimeTableSuccess = 'timeTable/ADD_SUBJECT_TO_TIME_TABLE_SUCCESS',
  AddSubjectToTimeTableFail = 'timeTable/ADD_SUBJECT_TO_TIME_TABLE_FAIL',

  DeleteSubjectFromTimeTableRequest = 'timeTable/DELETE_SUBJECT_FROM_TIME_TABLE_REQUEST',
  DeleteSubjectFromTimeTableSuccess = 'timeTable/DELETE_SUBJECT_FROM_TIME_TABLE_SUCCESS',
  DeleteSubjectFromTimeTableFail = 'timeTable/DELETE_SUBJECT_FROM_TIME_TABLE_FAIL',

  MoveSubjectInTimeTableRequest = 'timeTable/MOVE_SUBJECT_IN_TIME_TABLE_REQUEST',
  MoveSubjectInTimeTableSuccess = 'timeTable/MOVE_SUBJECT_IN_TIME_TABLE_SUCCESS',
  MoveSubjectInTimeTableFail = 'timeTable/MOVE_SUBJECT_IN_TIME_TABLE_FAIL',
}

export type TimeTableAction = {
  type: TimeTableActionType.GetTimeTableByGroupRequest;
  group: string;
  year: string;
} | {
  type: TimeTableActionType.GetTimeTableByYearRequest;
  year: string;
} | {
  type: TimeTableActionType.GetTimeTableBySpecialtyRequest;
  specialty: string;
} | {
  type: TimeTableActionType.GetTimeTableSuccess;
  timeTable: GroupTimeTable[];
} | {
  type: TimeTableActionType.GetTimeTableFail;
  message: string;
} | {
  type: TimeTableActionType.GetCalendarRequest;
} | {
  type: TimeTableActionType.GetCalendarSuccess;
  calendar: Calendar;
} | {
  type: TimeTableActionType.GetCalendarFail;
  message: string;
} | {
  type: TimeTableActionType.AddSubjectToTimeTableRequest;
  data: TimeTableData;
} | {
  type: TimeTableActionType.AddSubjectToTimeTableSuccess;
  calendarPace: CalendarPlace;
} | {
  type: TimeTableActionType.AddSubjectToTimeTableFail;
  message: string;
} | {
  type: TimeTableActionType.DeleteSubjectFromTimeTableRequest;
  data: TimeTableData;
} | {
  type: TimeTableActionType.DeleteSubjectFromTimeTableSuccess;
} | {
  type: TimeTableActionType.DeleteSubjectFromTimeTableFail;
  message: string;
} | {
  type: TimeTableActionType.MoveSubjectInTimeTableRequest;
  data: MoveTimeTableData;
} | {
  type: TimeTableActionType.MoveSubjectInTimeTableSuccess;
  calendarPace: CalendarPlace;
} | {
  type: TimeTableActionType.MoveSubjectInTimeTableFail;
  message: string;
};