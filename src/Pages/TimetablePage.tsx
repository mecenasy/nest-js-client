import React, { FC } from "react";
import Timetable from "../modules/Pages/Timetable/Timetable";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { actionCreator } from '../PageConfigs/timetableConfig';

const TimetablePage: FC = () => (
  <ActionsWrapper actionCreatorFactory={actionCreator}   >
    <Timetable />
  </ActionsWrapper>
);

export default TimetablePage