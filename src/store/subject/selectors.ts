import { createSelector } from 'reselect';
import { ApplicationState } from '../configuration/constants';
import { Subject } from './constants';

export const getSubjects = (state: ApplicationState): Subject[] => state.subjectList;

interface Param {
  group: string,
  year: string
}
export const getSubjectSelector = createSelector(
  getSubjects,
  (_: ApplicationState, param: Param) => param,
  (subjects, param) => subjects
)