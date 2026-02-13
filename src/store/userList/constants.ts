import { Person, SimplePerson } from '../person/constants';
import { University } from '../university/constants';

export enum ListType {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  User = 'user',
  OnlyTeacher = 'onlyTeacher'
}
export interface UserListState {
  simpleUsers?: SimplePerson[];
  users: Person[];
  pagination: Pagination;
  filters: Filters;
  filtersMap: University;
  selectedFilters: SelectedFilters & PaginationFilter;
  isFetching?: boolean;
}

export interface PaginationFilter {
  page?: number;
  pageSize?: number;
}
export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export type Filters = Record<string, string[]>
export type SelectedFilters = Record<string, string | string[] | undefined>

export const initialState: UserListState = {
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  },
  users: [],
  filters: {},
  filtersMap: {
    directions: [],
    group: [],
    roles: [],
    specialties: [],
    years: []
  },
  selectedFilters: {}
};
