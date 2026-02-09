import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getCalendarRequest, getTimeTableByGroupRequest } from '../store/timeTable/actions';

const TimetablePage = Loadable({
  loader: async () => import('../Pages/TimetablePage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => [
  Boolean((isMount && isHydrated) || isServer) && getCalendarRequest(),
  Boolean((isMount && isHydrated) || isServer) && getTimeTableByGroupRequest('IPA', '1'),
];

export const timetableConfig: PageConfig = {
  url: '/time-table',
  Component: TimetablePage,
  exact: true,
}
