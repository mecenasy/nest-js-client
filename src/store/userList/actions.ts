import { SimplePerson } from '../person/constants';
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
export const getSimpleUserListRequest = (): UserListAction => ({
  type: UserListActionType.GetSimpleUserListRequest,
});

export const getSimpleUserListSuccess = (userList: SimplePerson[]): UserListAction => ({
  userList,
  type: UserListActionType.GetSimpleUserListSuccess,
});

export const getSimpleUserListFail = (): UserListAction => ({
  type: UserListActionType.GetSimpleUserListFail,
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
