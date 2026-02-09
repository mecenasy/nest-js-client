import {
  Calendar,
  CalendarPlace,
  GroupTimeTable,
  MoveTimeTableData,
  TimeTableAction,
  TimeTableActionType,
  TimeTableData,
} from "./constants";

export const getTimeTableByGroupRequest = (group: string, year: string): TimeTableAction => ({
  type: TimeTableActionType.GetTimeTableByGroupRequest,
  group,
  year,
});

export const getTimeTableByYearRequest = (year: string): TimeTableAction => ({
  type: TimeTableActionType.GetTimeTableByYearRequest,
  year,
});

export const getTimeTableBySpecialtyRequest = (specialty: string): TimeTableAction => ({
  type: TimeTableActionType.GetTimeTableBySpecialtyRequest,
  specialty,
});

export const getTimeTableSuccess = (timeTable: GroupTimeTable[]): TimeTableAction => ({
  type: TimeTableActionType.GetTimeTableSuccess,
  timeTable,
});

export const getTimeTableFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.GetTimeTableFail,
  message,
});

export const getCalendarRequest = (): TimeTableAction => ({
  type: TimeTableActionType.GetCalendarRequest,
});

export const getCalendarSuccess = (calendar: Calendar): TimeTableAction => ({
  type: TimeTableActionType.GetCalendarSuccess,
  calendar,
});

export const getCalendarFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.GetCalendarFail,
  message,
});

export const addSubjectToTimeTableRequest = (data: TimeTableData): TimeTableAction => ({
  type: TimeTableActionType.AddSubjectToTimeTableRequest,
  data,
});

export const addSubjectToTimeTableSuccess = (calendarPace: CalendarPlace): TimeTableAction => ({
  type: TimeTableActionType.AddSubjectToTimeTableSuccess,
  calendarPace,
});

export const addSubjectToTimeTableFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.AddSubjectToTimeTableFail,
  message,
});

export const deleteSubjectFromTimeTableRequest = (data: TimeTableData): TimeTableAction => ({
  type: TimeTableActionType.DeleteSubjectFromTimeTableRequest,
  data,
});

export const deleteSubjectFromTimeTableSuccess = (): TimeTableAction => ({
  type: TimeTableActionType.DeleteSubjectFromTimeTableSuccess,
});

export const deleteSubjectFromTimeTableFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.DeleteSubjectFromTimeTableFail,
  message,
});

export const moveSubjectInTimeTableRequest = (data: MoveTimeTableData): TimeTableAction => ({
  type: TimeTableActionType.MoveSubjectInTimeTableRequest,
  data,
});

export const moveSubjectInTimeTableSuccess = (calendarPace: CalendarPlace): TimeTableAction => ({
  type: TimeTableActionType.MoveSubjectInTimeTableSuccess,
  calendarPace,
});

export const moveSubjectInTimeTableFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.MoveSubjectInTimeTableFail,
  message,
});
