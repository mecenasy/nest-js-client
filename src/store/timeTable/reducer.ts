import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import {
  initialState,
  GroupTimeTable,
  Calendar,
  MoveSuccessPayload,
  TimeTableData,
  CalendarPlace,
  CalendarParams,
  MoveRequestPayload
} from './constants';
import { logoutSuccess } from '../auth/reducers';

export const getTimeTableRequest = createAction<CalendarParams>('timeTable/getTimeTableRequest');
export const getCalendarRequest = createAction('timeTable/getCalendarRequest');
export const addSubjectToTimeTableRequest = createAction<TimeTableData>('timeTable/addSubjectToTimeTableRequest');
export const deleteSubjectFromTimeTableRequest = createAction<TimeTableData>('timeTable/deleteSubjectFromTimeTableRequest');
export const moveSubjectInTimeTableRequest = createAction<MoveRequestPayload>('timeTable/moveSubjectInTimeTableRequest');

export const getTimeTableFail = createAction<string>('timeTable/getTimeTableFail');
export const getCalendarFail = createAction<string>('timeTable/getCalendarFail');
export const moveSubjectInTimeTableFail = createAction<string>('timeTable/moveSubjectInTimeTableFail');
export const deleteSubjectFromTimeTableFail = createAction<string>('timeTable/deleteSubjectFromTimeTableFail');
export const addSubjectToTimeTableFail = createAction<string>('timeTable/addSubjectToTimeTableFail');

const timeTableSlice = createSlice({
  name: 'timeTable',
  initialState,
  reducers: {
    getTimeTableSuccess: (state, action: PayloadAction<GroupTimeTable[]>) => {
      state.groupsTable = action.payload;
    },
    getCalendarSuccess: (state, action: PayloadAction<Calendar>) => {
      state.days = action.payload.days;
      state.hours = action.payload.hours;
    },
    moveSubjectInTimeTableSuccess: (state, action: PayloadAction<MoveSuccessPayload>) => {
      const { newCalendarPlace, oldCalendarPlace, year, group } = action.payload;
      const groupIndex = state.groupsTable.findIndex((g) => g.name === group && g.year === year);

      if (groupIndex !== -1) {
        const groupTable = state.groupsTable[groupIndex];
        groupTable.timeTable = groupTable.timeTable.filter(({ days, hours }) => days !== oldCalendarPlace.days || hours !== oldCalendarPlace.hours);
        groupTable.timeTable.push(newCalendarPlace);
      }
    },
    deleteSubjectFromTimeTableSuccess: (state, action: PayloadAction<TimeTableData>) => {
      const { year, group, days, hours } = action.payload;
      const groupIndex = state.groupsTable.findIndex((g) => g.name === group && g.year === year);
      if (groupIndex !== -1) {
        state.groupsTable[groupIndex].timeTable = state.groupsTable[groupIndex].timeTable.filter((e) => days !== e.days || hours !== e.hours);
      }
    },
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
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    getCalendarDays: (state) => state.days,
    getCalendarHours: (state) => state.hours,
    getTimeTable: (state) => state.groupsTable,
  }
});

export const timeTableReducer = timeTableSlice.reducer;
export const {
  getTimeTableSuccess,
  getCalendarSuccess,
  moveSubjectInTimeTableSuccess,
  deleteSubjectFromTimeTableSuccess,
  addSubjectToTimeTableSuccess,
} = timeTableSlice.actions;

export const {
  getCalendarDays,
  getCalendarHours,
  getTimeTable
} = timeTableSlice.selectors;