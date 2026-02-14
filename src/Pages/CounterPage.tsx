import React, { FC, } from 'react';
import Counter from '../modules/Pages/Counter/Counter';
import ActionsWrapper from './Actions/ActionsWrapper';
import { counterReducer, incrementByCountRequest } from '../store/counter/reducers';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';

const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('counter', counterReducer);
  }
  if (force) {
    registerReducer();
  }
  return ['counter']
};

export const actionCreator: ActionCreatorFactory = (
  { isHydrated, isMount, isServer, isUpdate },
  location,
  match,
) => {
  console.log("🚀 match", match);
  console.log("🚀 location", location);

  return filterAction([
    Boolean(isServer || (isMount && isHydrated)) && incrementByCountRequest(50),
    Boolean(isServer) && { type: 'IS_SERVER' },
    Boolean(isMount) && { type: 'IS_MOUNT' },
    Boolean(isMount && isHydrated) && { type: 'IS_MOUNT_AND_IS_HYDRATED' },
    Boolean(isUpdate) && { type: 'IS_UPDATE' },
  ]);
};

reducersInject(!SERVER_BUILD);

const HomePage: FC = () => {
  ;

  return (
    <ActionsWrapper
      reducersKey={reducersInject(SERVER_BUILD, true)}
      actionCreatorFactory={actionCreator}
    >
      <Counter />
    </ActionsWrapper>
  )
};

export default HomePage
