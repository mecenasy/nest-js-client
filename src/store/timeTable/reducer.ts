import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, GroupTimeTable, Calendar, MoveSuccessPayload, TimeTableData, CalendarPlace, CalendarParams, MoveRequestPayload } from './constants';

export const getTimeTableRequest = createAction<CalendarParams>('timeTable/GET_TIME_TABLE_REQUEST');
export const getCalendarRequest = createAction('timeTable/GET_CALENDAR_REQUEST');
export const addSubjectToTimeTableRequest = createAction<TimeTableData>('timeTable/ADD_SUBJECT_TO_TIME_TABLE_REQUEST');
export const deleteSubjectFromTimeTableRequest = createAction<TimeTableData>('timeTable/DELETE_SUBJECT_FROM_TIME_TABLE_REQUEST');
export const moveSubjectInTimeTableRequest = createAction<MoveRequestPayload>('timeTable/MOVE_SUBJECT_IN_TIME_TABLE_REQUEST');

const timeTableSlice = createSlice({
  name: 'timeTable',
  initialState,
  reducers: {
    getTimeTableSuccess: (state, action: PayloadAction<GroupTimeTable[]>) => {
      state.groupsTable = action.payload;
    },
    getTimeTableFail: (state, action: PayloadAction<string>) => {},
    getCalendarSuccess: (state, action: PayloadAction<Calendar>) => {
      state.days = action.payload.days;
      state.hours = action.payload.hours;
    },
    getCalendarFail: (state, action: PayloadAction<string>) => {},
    moveSubjectInTimeTableSuccess: (state, action: PayloadAction<MoveSuccessPayload>) => {
      const { newCalendarPlace, oldCalendarPlace, year, group } = action.payload;
      const groupIndex = state.groupsTable.findIndex((g) => g.name === group && g.year === year);

      if (groupIndex !== -1) {
        const groupTable = state.groupsTable[groupIndex];
        groupTable.timeTable = groupTable.timeTable.filter(({ days, hours }) => days !== oldCalendarPlace.days || hours !== oldCalendarPlace.hours);
        groupTable.timeTable.push(newCalendarPlace);
      }
    },
    moveSubjectInTimeTableFail: (state, action: PayloadAction<string>) => {},
    deleteSubjectFromTimeTableSuccess: (state, action: PayloadAction<TimeTableData>) => {
      const { year, group, days, hours } = action.payload;
      const groupIndex = state.groupsTable.findIndex((g) => g.name === group && g.year === year);
      if (groupIndex !== -1) {
        state.groupsTable[groupIndex].timeTable = state.groupsTable[groupIndex].timeTable.filter((e) => days !== e.days || hours !== e.hours);
      }
    },
    deleteSubjectFromTimeTableFail: (state, action: PayloadAction<string>) => {},
    addSubjectToTimeTableSuccess: (state, action: PayloadAction<CalendarPlace>) => {
      const calendarPace = action.payload;
      const groupIndex = state.groupsTable.findIndex((group) => group.name === calendarPace.group);

      if (groupIndex !== -1) {
        state.groupsTable[groupIndex].timeTable.push(calendarPace);
      } else {
        state.groupsTable.push({
          name: calendarPace.group,
          year: calendarPace.year,
          timeTable: [calendarPace],
        });
      }
    },
    addSubjectToTimeTableFail: (state, action: PayloadAction<string>) => {},
  },
  selectors: {
    getCalendarDays: (state) => state.days,
    getCalendarHours: (state) => state.hours,
    getTimeTable: (state) => state.groupsTable,
  }
});

export const timeTableReducer = timeTableSlice.reducer;
export const {
  getTimeTableSuccess, getTimeTableFail,
  getCalendarSuccess, getCalendarFail,
  moveSubjectInTimeTableSuccess, moveSubjectInTimeTableFail,
  deleteSubjectFromTimeTableSuccess, deleteSubjectFromTimeTableFail,
  addSubjectToTimeTableSuccess, addSubjectToTimeTableFail
} = timeTableSlice.actions;

export const {
  getCalendarDays,
  getCalendarHours,
  getTimeTable
} = timeTableSlice.selectors;