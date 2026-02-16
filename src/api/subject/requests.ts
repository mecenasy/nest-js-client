import api from '../api';
import { AxiosResponse } from 'axios';
import { subjectPath } from './paths';
import { CreateSubject, Subject } from '~/src/store/subject/constants';

export const getSubjects = (): Promise<AxiosResponse<Subject[]>> => api.get(subjectPath);
export const addSubject = (subject: CreateSubject[]): Promise<AxiosResponse<Subject>> =>
  api.post(subjectPath, subject);
export const updateSubject = (subject: Subject): Promise<AxiosResponse<Subject>> =>
  api.patch(`${subjectPath}/${subject.id}`, subject);
export const deleteSubject = (id: string) => api.delete(`${subjectPath}/${id}`);
