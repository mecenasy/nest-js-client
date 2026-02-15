import React, { memo, } from 'react';
import ActionsWrapper from './Actions/ActionsWrapper';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';
import { getStudentsGradesRequest, getTeacherGradesRequest, gradeReducer } from '../store/grade/reducer';

const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('grades', gradeReducer);
  }
  if (force) {
    registerReducer('GradesPage');
  }
  return ['grades']
};

export const actionCreator: ActionCreatorFactory = (
  { isHydrated, isMount, isServer, isUpdate },
) => {


  return filterAction([
    Boolean(isServer || (isMount && isHydrated)) && getTeacherGradesRequest(),
    Boolean(isServer || (isMount && isHydrated)) && getStudentsGradesRequest(),
  ]);
};

reducersInject(!SERVER_BUILD);

const GradesPage = () => {
  ;

  return (
    <ActionsWrapper
      reducersKey={reducersInject(SERVER_BUILD, true)}
      actionCreatorFactory={actionCreator}
    >
      sdfsfdsfdsfsdfsfdsfsfdsfddsfdsf
    </ActionsWrapper>
  )
};

export default memo(GradesPage);
