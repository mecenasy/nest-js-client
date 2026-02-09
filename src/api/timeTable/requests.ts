import { MoveTimeTableData, TimeTableData } from '../../store/timeTable/constants';
import api from '../api';
import { groupPath, specialtyPath, yearPath, calendar, timeTable, } from './paths';

export const addSubjectToTimeTable = async (data: TimeTableData) => await api.post(timeTable, data);

export const deleteSubjectFromTimeTable = async (data: TimeTableData) => await api.delete(timeTable, { data });

export const getCalendar = async () => await api.get(calendar);

export const getTimeTableByGroup = async (group: string, year: string) => await api.get(groupPath(group, year));

export const getTimeTableBySpecialty = async (specialty: string) => await api.get(specialtyPath(specialty));

export const getTimeTableByYear = async (year: string) => await api.get(yearPath(year));

export const moveSubjectInTimeTable = async (data: MoveTimeTableData) => await api.put(timeTable, data);
