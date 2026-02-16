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
  date: Date;
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

export interface TeacherSubjectGrades {
  id: string;
  name: string;
  students: StudentGrades[];
}
export interface TeacherGrades {
  group: string;
  year: string;
  subjects: TeacherSubjectGrades[];
}

export interface GradesState {
  teachers: TeacherGrades[];
  student: SubjectGrades[];
}

export interface GradeField {
  studentId: string;
  subjectId: string;
  grade: string;
}

export interface CreateGrade extends GradeField {
  teacherId: string;
}

export interface UpdateGradeActionPayload {
  toUpdate: GradeField[];
}

export interface AddGradeActionPayload {
  toAdd: GradeField[];
}

export interface GradesReducer {
  teachers: Reducer<TeacherGrades[], UnknownAction>;
  student: Reducer<SubjectGrades[], UnknownAction>;
}

export const initialState: GradesState = {
  teachers: [],
  student: [],
};
