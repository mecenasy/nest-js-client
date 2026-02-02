import { Person } from '../person/constants';
import { RoleType } from '../role/constants';

export interface UserList {
  users: Person[];
  pagination: Pagination;
  filters: Filters;
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
  GetUserListRequest = 'userList/GET_UES_LIST_REQUEST',
  GetUserListSuccess = 'userList/GET_UES_LIST_SUCCESS',
  GetUserListFail = 'userList/GET_UES_LIST_FAIL',
  SetFilter = 'userList/SET_FILTER',
  SetPage = 'userList/SET_PAGE',
}

export type UserListAction = {
  type: UserListActionType.GetUserListRequest;
  searchParam?: string;
  listType: RoleType
} | {
  type: UserListActionType.GetUserListSuccess;
  userList: UserList;
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

export type ExtractByType<T extends { type: any }, K extends T['type']> = Extract<T, { type: K }>;

export const initialState: UserList = {
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  },
  users: [],
  filters: {},
  selectedFilters: {}
};
