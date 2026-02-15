import React, { memo } from 'react';
import ActionsWrapper from './Actions/ActionsWrapper';
import Subject from '../modules/Pages/Subject/Subject';
import { getUniversityRequest, universityReducer } from '../store/university/reducer';
import { getSimpleUserListRequest, userListReducer } from '../store/userList/reducer';
import { getSubjectsRequest, subjectReducer } from '../store/subject/reducer';
import { ListType } from '../store/userList/constants';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';

const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('university', universityReducer);
    injectReducer('subject', subjectReducer);
    injectReducer('userList', userListReducer);
  }
  if (force) {
    registerReducer('ChangePasswordPage');
  }
  return ['university', 'subject', 'userList',]
};

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => filterAction([
  Boolean((isMount && isHydrated) || isServer) && getUniversityRequest(),
  Boolean((isMount && isHydrated) || isServer) && getSubjectsRequest(),
  Boolean((isMount && isHydrated) || isServer) && getSimpleUserListRequest(ListType.OnlyTeacher),
]);

reducersInject(!SERVER_BUILD);

const ChangePasswordPage = () => {
  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <Subject />
    </ActionsWrapper>
  );
};

export default memo(ChangePasswordPage);
