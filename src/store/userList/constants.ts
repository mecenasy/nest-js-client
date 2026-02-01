export interface UserList {
  users: any[];
  pagination: {
    count: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
  filters: Filters;
  selectedFilters: SelectedFilters
}

export type Filters = Record<string, string[]>
export type SelectedFilters = Record<string, string | string[]>
export enum UserListActionType {
  GetUserListRequest = 'userList/GET_UES_LIST_REQUEST',
  GetUserListSuccess = 'userList/GET_UES_LIST_SUCCESS',
  GetUserListFail = 'userList/GET_UES_LIST_FAIL',
  SetFilter = 'userList/SET_FILTER',
}

export type UserListAction = {
  type: UserListActionType.GetUserListRequest;
  params: Record<string, string | string[]>
} | {
  type: UserListActionType.GetUserListSuccess;
  userList: UserList;
} | {
  type: UserListActionType.SetFilter;
  name: string;
  value: string | string[];
} | {
  type: UserListActionType.GetUserListFail;
  message: string,
};

export const initialState: UserList = {
  pagination: {
    count: 0,
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  },
  users: [],
  filters: {},
  selectedFilters: {}
};
