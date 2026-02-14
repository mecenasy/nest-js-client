import React, { FC } from 'react';
import ActionsWrapper from './Actions/ActionsWrapper';
import ChangePassword from '../modules/Pages/ChangePassword/ChangePassword';
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
    registerReducer();
  }
  return ['menu', 'person', 'notification']
};

export const actionCreator: ActionCreatorFactory = () => [];

reducersInject(!SERVER_BUILD);

const ChangePasswordPage: FC = () => {
  return (
    <ActionsWrapper
      reducersKey={reducersInject(SERVER_BUILD, true)}
      actionCreatorFactory={actionCreator}
    >
      <ChangePassword />
    </ActionsWrapper>
  );
};

export default ChangePasswordPage;
