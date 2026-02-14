import React, { FC } from "react";
import Timetable from "../modules/Pages/Timetable/Timetable";
import ActionsWrapper from "./Actions/ActionsWrapper";
import { getCalendarRequest, getTimeTableRequest, timeTableReducer } from '../store/timeTable/reducer';
import { CalendarType } from '../store/timeTable/constants';
import { getUniversityRequest } from '../store/university/reducer';
import { getSubjectsRequest } from '../store/subject/reducer';
import { injectReducer, registerReducer } from '../store/configuration/rootReducer';
import { ActionCreatorFactory, ReducerFactory } from '../PageConfigs/constants';
import { filterAction } from '../PageConfigs/helpers/filterAction';

const reducersInject: ReducerFactory = (inject, force) => {
  if (inject) {
    injectReducer('timeTable', timeTableReducer);
  }
  if (force) {
    registerReducer();
  }
  return ['menu', 'person', 'notification']
};

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, { search }) => {
  const type = new URLSearchParams(search).get('type') as CalendarType.Group;
  const group = new URLSearchParams(search).get('group') ?? '';
  const year = new URLSearchParams(search).get('year') ?? '';

  if (type === CalendarType.Group || type === CalendarType.Teacher) {
    return filterAction([
      Boolean((isMount && isHydrated) || isServer) && getCalendarRequest(),
      Boolean((isMount && isHydrated) || isServer) && getTimeTableRequest({ type, group, year }),
    ]);
  }

  return filterAction([
    Boolean((isMount && isHydrated) || isServer) && getCalendarRequest(),
    Boolean((isMount && isHydrated) || isServer) && getUniversityRequest(),
    Boolean((isMount && isHydrated) || isServer) && getSubjectsRequest(),
  ]);
}

reducersInject(!SERVER_BUILD);

const TimetablePage: FC = () => {
  return (
    <ActionsWrapper reducersKey={reducersInject(SERVER_BUILD, true)} actionCreatorFactory={actionCreator}   >
      <Timetable />
    </ActionsWrapper>
  );
};

export default TimetablePage