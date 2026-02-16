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
  groupsTable: [],
};

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

export enum CalendarType {
  Group = 'group',
  Teacher = 'teacher`',
  Year = 'year',
  Specialty = 'specialty',
}

export type CalendarParams =
  | {
      type: CalendarType.Group;
      group: string;
      year: string;
    }
  | {
      type: CalendarType.Teacher;
    }
  | {
      type: CalendarType.Specialty;
      specialty: string;
    }
  | {
      type: CalendarType.Year;
      year: string;
    };
export interface MoveTimeTableData extends TimeTableData {
  newHours: string;
  newDays: string;
  newAuditorium: string;
}

export interface MoveSuccessPayload {
  newCalendarPlace: CalendarPlace;
  oldCalendarPlace: TimeTableData;
  year: string;
  group: string;
}

export interface MoveRequestPayload {
  data: MoveTimeTableData;
  year: string;
  group: string;
}
