import React, { memo } from "react";
import ActionsWrapper from "./Actions/ActionsWrapper";
import UserList from '../modules/Pages/UserList/UserList';
import { getUserListRequest, userListReducer } from '../store/userList/reducer';
import { ListType } from '../store/userList/constants';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';

const reducersInject: ReducerFactory = (inject, force) => {

  if (inject) {
    injectReducer('userList', userListReducer);
  }
  if (force) {
    registerReducer('StudentListPage');
  }
  return ['userList']
};

const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => filterAction([
  Boolean((isMount && isHydrated) || isServer) && getUserListRequest({
    searchParam: location.search ?? '',
    listType: ListType.Student
  }),
]);

reducersInject(!SERVER_BUILD);

const StudentListPage = () => {
  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <UserList />
    </ActionsWrapper>
  );
};

export default memo(StudentListPage)