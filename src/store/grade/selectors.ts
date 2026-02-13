import { ApplicationState } from '../configuration/constants';
import { SubjectGrades, TeacherGrades } from './constants';

export const getTeacherGradesSelector = (state: ApplicationState): TeacherGrades[] => state.grades.teachers;
export const getStudentsGradesSelector = (state: ApplicationState): SubjectGrades[] => state.grades.student;
