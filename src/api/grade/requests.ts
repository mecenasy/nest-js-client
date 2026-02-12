import { CreateGrade } from '~/src/store/grade/constants';
import api from '../api';
import { grade, gradeStudent, gradeTeacher } from './paths';

export const addGrades = (grades: CreateGrade[]) =>
  api.post(grade, grades)
export const updateGrades = (grades: CreateGrade[]) =>
  api.patch(grade, grades)
export const removeGrade = (id: string) =>
  api.delete(`${grade}/${id}`)
export const getTeacherGrades = () =>
  api.get(gradeTeacher)
export const getStudentGrades = () =>
  api.get(gradeStudent)