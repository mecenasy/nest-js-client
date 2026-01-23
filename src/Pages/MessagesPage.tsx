import React, { FC } from "react";
import Messages from "../modules/Pages/Messages/Messages";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { actionCreator } from '../PageConfigs/messagesConfig';

const MessagesPage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <Messages />
  </ActionsWrapper>
);

export default MessagesPage;