import React, { FC } from "react";
import Messages from "../modules/Pages/Messages/Messages";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { getMessageListRequest, getMessageRequest, messageReducer } from '../store/messages/reducer';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { filterAction } from '../PageConfigs/helpers/filterAction';

export const reducersInject: ReducerFactory = (inject: boolean, force?: boolean) => {
  if (inject) {
    injectReducer('messageList', messageReducer);
  }
  if (force) {
    registerReducer()
  }
  return ['messageList']
};

export const actionCreator: ActionCreatorFactory = ({ isHydrated, isMount, isServer }, location) => filterAction([
  Boolean(((isHydrated && isMount) || isServer) && !location.search) && getMessageListRequest(''),
  Boolean(((isHydrated && isMount) || isServer) && location.search)
  && getMessageRequest(new URLSearchParams(location.search).get('messageId') ?? ''),
]);
reducersInject(!SERVER_BUILD);

const MessagesPage: FC = () => {
  return (
    <ActionsWrapper
      reducersKey={reducersInject(SERVER_BUILD, true)}
      actionCreatorFactory={actionCreator}
    >
      <Messages />
    </ActionsWrapper>
  );
};

export default MessagesPage;