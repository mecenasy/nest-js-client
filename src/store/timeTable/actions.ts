import {
  Calendar,
  CalendarParams,
  CalendarPlace,
  GroupTimeTable,
  MoveRequestPayload,
  MoveSuccessPayload,
  TimeTableAction,
  TimeTableActionType,
  TimeTableData,
} from "./constants";

export const getTimeTableRequest = (payload: CalendarParams): TimeTableAction => ({
  type: TimeTableActionType.GetTimeTableRequest,
  payload,
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

export const deleteSubjectFromTimeTableSuccess = (data: TimeTableData): TimeTableAction => ({
  type: TimeTableActionType.DeleteSubjectFromTimeTableSuccess,
  data,
});

export const deleteSubjectFromTimeTableFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.DeleteSubjectFromTimeTableFail,
  message,
});

export const moveSubjectInTimeTableRequest = (payload: MoveRequestPayload): TimeTableAction => ({
  type: TimeTableActionType.MoveSubjectInTimeTableRequest,
  payload
});

export const moveSubjectInTimeTableSuccess = (payload: MoveSuccessPayload): TimeTableAction => ({
  type: TimeTableActionType.MoveSubjectInTimeTableSuccess,
  payload,
});

export const moveSubjectInTimeTableFail = (message: string): TimeTableAction => ({
  type: TimeTableActionType.MoveSubjectInTimeTableFail,
  message,
});
