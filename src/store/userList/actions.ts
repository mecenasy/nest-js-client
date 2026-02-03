import { RoleType } from '../role/constants';
import { UserListState, UserListAction, UserListActionType } from '../userList/constants';

export const getUserListRequest = (searchParam: string, listType: RoleType): UserListAction => ({
  type: UserListActionType.GetUserListRequest,
  searchParam,
  listType
});

export const getUserListSuccess = (userList: UserListState): UserListAction => ({
  userList,
  type: UserListActionType.GetUserListSuccess,
});

export const getUserListFail = (message: string): UserListAction => ({
  message,
  type: UserListActionType.GetUserListFail,
});

export const setFilterUserFilter = (name: string, value: string | string[] | undefined): UserListAction => ({
  name,
  value,
  type: UserListActionType.SetFilter,
});

export const setUserListPage = (page?: number, pageSize?: number): UserListAction => ({
  page,
  pageSize,
  type: UserListActionType.SetPage,
});
