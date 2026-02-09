import { ApplicationState } from '../configuration/constants';

export const getCalendarDays = (state: ApplicationState) => state.timeTable.days;
export const getCalendarHours = (state: ApplicationState) => state.timeTable.hours;
export const getTimeTable = (state: ApplicationState) => state.timeTable.groupsTable;