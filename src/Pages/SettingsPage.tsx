import React, { memo } from "react";
import Settings from "../modules/Pages/Settings/Settings";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { personReducer } from '../store/person/reducer';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';

const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('person', personReducer);
  }
  if (force) {
    registerReducer('SettingsPage');
  }
  return ['menu', 'person', 'notification']
};

const actionCreator: ActionCreatorFactory = () => []

reducersInject(!SERVER_BUILD);

const SettingsPage = () => (
  <ActionsWrapper
    reducersKey={reducersInject(SERVER_BUILD, true)}
    actionCreatorFactory={actionCreator}
  >
    <Settings />
  </ActionsWrapper>
);

export default memo(SettingsPage);