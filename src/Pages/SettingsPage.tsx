import React, { FC } from "react";
import Settings from "../modules/Pages/Settings/Settings";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { actionCreator } from '../PageConfigs/settingsConfig';

const SettingsPage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <Settings />
  </ActionsWrapper>
);

export default SettingsPage