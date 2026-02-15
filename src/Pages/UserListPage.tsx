import React, { memo } from "react";
import ActionsWrapper from "./Actions/ActionsWrapper";
import UserList from '../modules/Pages/UserList/UserList';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { getUserListRequest, userListReducer } from '../store/userList/reducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';
import { ListType } from '../store/userList/constants';

const reducersInject: ReducerFactory = (inject, force) => {

  if (inject) {
    injectReducer('userList', userListReducer);
  }
  if (force) {
    registerReducer('UserListPage');
  }
  return ['userList']
};

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => filterAction([
  Boolean((isMount && isHydrated) || isServer) && getUserListRequest({
    searchParam: location.search ?? '',
    listType: ListType.Admin
  }),
]);

reducersInject(!SERVER_BUILD);

const UserListPage = () => {
  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <UserList />
    </ActionsWrapper>
  );
};

export default memo(UserListPage);