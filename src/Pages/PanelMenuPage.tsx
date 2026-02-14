import React, { FC } from 'react';
import ActionsWrapper from './Actions/ActionsWrapper';
import PanelMenu from '../modules/Pages/PanelMenu/PanelMenu';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { getRoleRequest, roleReducer } from '../store/role/reducer';
import { getMenuItemsRequest, panelMenuReducer } from '../store/panelMenu/reducers';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';

export const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('role', roleReducer);
    injectReducer('panelMenu', panelMenuReducer);
  }
  if (force) {
    registerReducer();
  }
  return ['menu', 'person', 'notification']
};

export const actionCreator: ActionCreatorFactory = ({ isMount, isServer, isHydrated }) => filterAction([
  Boolean((isMount && isHydrated) || isServer) && getRoleRequest(),
  Boolean((isMount && isHydrated) || isServer) && getMenuItemsRequest(),
]);

reducersInject(!SERVER_BUILD);

const ChangePasswordPage: FC = () => {
  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <PanelMenu />
    </ActionsWrapper>
  );
};

export default ChangePasswordPage;
