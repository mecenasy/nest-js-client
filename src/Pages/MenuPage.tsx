import React, { memo } from "react";
import Menu from "../modules/Menu/Menu";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { getMenuRequest, menuReducer } from '../store/menu/reducers';
import { getPersonRequest, personReducer } from '../store/person/reducer';
import { getNotificationRequest, notificationReducer, notificationStart } from '../store/notification/reducer';
import { filterAction } from '../PageConfigs/helpers/filterAction';

export const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('menu', menuReducer);
    injectReducer('person', personReducer);
    injectReducer('notification', notificationReducer);
  }
  if (force) {
    registerReducer('MenuPage');
  }
  return ['menu', 'person', 'notification']
};

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer, isUpdate }) => filterAction([
  Boolean((isHydrated && isMount && !isUpdate) || isServer) && getMenuRequest(),
  Boolean((isHydrated && isMount && !isUpdate) || isServer) && getPersonRequest(),
  Boolean((isHydrated && isMount && !isUpdate) || isServer) && getNotificationRequest(),
  Boolean(isMount && !isUpdate) && notificationStart(),
]);

reducersInject(!SERVER_BUILD);

const MenuPage = () => {

  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <Menu />
    </ActionsWrapper>
  )
};

export default memo(MenuPage);
