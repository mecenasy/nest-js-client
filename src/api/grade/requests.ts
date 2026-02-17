import { CreateGrade, UpdatedGradeField } from '~/src/store/grade/constants';
import api from '../api';
import { grade, gradeStudent, gradeTeacher } from './paths';

export const addGrades = (grades: CreateGrade[]) => api.post(grade, grades);

export const updateGrades = (grades: UpdatedGradeField[]) => api.patch(grade, grades);

export const removeGrade = (id: string) => api.delete(`${grade}/${id}`);

export const getTeacherGrades = (id: string) => api.get(`${gradeTeacher}/${id}`);

export const getStudentGrades = (id: string) => api.get(`${gradeStudent}/${id}`);
