import { Reducer, UnknownAction } from 'redux';

export interface Subject {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
}

export interface Grade {
  id: string;
  grade: string;
  time: Date;
  subject?: Subject;
  student?: Student;
}

export interface SubjectGrades {
  subject: string;
  grades: Grade[];
}

export interface StudentGrades {
  id: string;
  name: string;
  grades: Grade[];
}

export interface TeacherGrades {
  group: string;
  year: string;
  students: StudentGrades[];
}

export interface GradesState {
  teachers: TeacherGrades[];
  student: SubjectGrades[];
}

export interface CreateGrade {
  grade: string;
  subjectId: string;
  teacherId: string;
  studentId: string;
}

export interface GradesReducer {
  teachers: Reducer<TeacherGrades[], UnknownAction>;
  student: Reducer<SubjectGrades[], UnknownAction>;
}

export const initialState: GradesState = {
  teachers: [],
  student: [],
};
