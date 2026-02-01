import { SelectedFilters, UserList, UserListAction, UserListActionType } from '../userList/constants';

export const getUserListRequest = (params: SelectedFilters): UserListAction => ({
  type: UserListActionType.GetUserListRequest,
  params
});

export const getUserListSuccess = (userList: UserList): UserListAction => ({
  userList,
  type: UserListActionType.GetUserListSuccess,
});

export const getUserListFail = (message: string): UserListAction => ({
  message,
  type: UserListActionType.GetUserListFail,
});

export const setFilter = (name: string, value: string | string[]): UserListAction => ({
  name,
  value,
  type: UserListActionType.SetFilter,
});
