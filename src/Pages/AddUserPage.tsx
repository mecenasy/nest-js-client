import React, { memo, useLayoutEffect, useState } from "react";
import AddUser from "../modules/Pages/AddUser/AddUser";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { getRoleRequest, roleReducer } from '../store/role/reducer';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { getUniversityRequest, universityReducer } from '../store/university/reducer';
import { filterAction } from '../PageConfigs/helpers/filterAction';


const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('role', roleReducer);
    injectReducer('university', universityReducer);
  }
  if (force) {
    registerReducer('AddUserPage');
  }
  return ['role', 'university']
};

const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => filterAction([
  Boolean((isMount && isHydrated) || isServer) && getRoleRequest(),
  Boolean((isMount && isHydrated) || isServer) && getUniversityRequest(),
]);
reducersInject(!SERVER_BUILD);

const AddUserPage = () => {

  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <AddUser />
    </ActionsWrapper>
  )
};
99
export default memo(AddUserPage)