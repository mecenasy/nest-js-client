import React, { FC } from 'react';
import ActionsWrapper from './Actions/ActionsWrapper';
import Logout from '../modules/Pages/Logout/Logout';
import { logoutRequest } from '../store/auth/reducers';
import { filterAction } from '../PageConfigs/helpers/filterAction';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { menuReducer } from '../store/menu/reducers';
import { personReducer } from '../store/person/reducer';
import { notificationReducer } from '../store/notification/reducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';

export const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('menu', menuReducer);
    injectReducer('person', personReducer);
    injectReducer('notification', notificationReducer);
  }
  if (force) {
    registerReducer('LogoutPage');
  }
  return ['menu', 'person', 'notification']
};


export const actionCreator: ActionCreatorFactory = ({ isServer, isMount }) => filterAction([
  Boolean(isServer || isMount) && logoutRequest(),
]);

reducersInject(!SERVER_BUILD);

const LogoutPage: FC = () => {
  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <Logout />
    </ActionsWrapper>
  );
};

export default LogoutPage;
