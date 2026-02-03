import { Person } from '../person/constants';
import { RoleType } from '../role/constants';
import { University } from '../university/constants';

export interface UserListState {
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
export enum UserListActionType {
  GetUserListRequest = 'userList/GET_USER_LIST_REQUEST',
  GetUserListSuccess = 'userList/GET_USER_LIST_SUCCESS',
  GetUserListFail = 'userList/GET_USER_LIST_FAIL',
  SetFilter = 'userList/SET_FILTER',
  SetPage = 'userList/SET_PAGE',
}

export type UserListAction = {
  type: UserListActionType.GetUserListRequest;
  searchParam?: string;
  listType: RoleType
} | {
  type: UserListActionType.GetUserListSuccess;
  userList: UserListState;
} | {
  type: UserListActionType.SetFilter;
  name: string;
  value: string | string[] | undefined;
} | {
  type: UserListActionType.SetPage;
  pageSize?: number;
  page?: number,
} | {
  type: UserListActionType.GetUserListFail;
  message: string,
};


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
