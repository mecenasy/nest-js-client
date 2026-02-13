import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getCalendarRequest, getTimeTableRequest } from '../store/timeTable/reducer';
import { CalendarType } from '../store/timeTable/constants';
import { getUniversityRequest } from '../store/university/reducer';
import { getSubjectsRequest } from '../store/subject/reducer';

const TimetablePage = Loadable({
  loader: async () => import('../Pages/TimetablePage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, { search }) => {
  const type = new URLSearchParams(search).get('type') as CalendarType.Group;
  const group = new URLSearchParams(search).get('group') ?? '';
  const year = new URLSearchParams(search).get('year') ?? '';

  if (type === CalendarType.Group || type === CalendarType.Teacher) {
    return [
      Boolean((isMount && isHydrated) || isServer) && getCalendarRequest(),
      Boolean((isMount && isHydrated) || isServer) && getTimeTableRequest({ type, group, year }),
    ];
  }

  return [
    Boolean((isMount && isHydrated) || isServer) && getCalendarRequest(),
    Boolean((isMount && isHydrated) || isServer) && getUniversityRequest(),
    Boolean((isMount && isHydrated) || isServer) && getSubjectsRequest(),

  ];
}

export const timetableConfig: PageConfig = {
  url: '/time-table',
  Component: TimetablePage,
  exact: true,
}
