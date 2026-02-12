import { createSelector } from 'reselect';
import { ApplicationState } from '../configuration/constants';
import { Subject } from './constants';

export const getSubjects = (state: ApplicationState): Subject[] => state.subjectList;

interface Param {
  group?: string;
  year?: string;
  search?: string
}
export const getSubjectSelector = createSelector(
  getSubjects,
  (_: ApplicationState, param: Param) => param.group,
  (_: ApplicationState, param: Param) => param.search,
  (_: ApplicationState, param: Param) => param.year,
  (subjects, group, search, year) => {
    if (search) {
      return subjects?.
        filter(({ name }) => name?.toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()))
    }
    return subjects
  }
)