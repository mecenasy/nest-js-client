import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const TimetablePage = Loadable({
  loader: async () => import('../Pages/TimetablePage'),
  loading: Loader,
});

export const timetableConfig: PageConfig = {
  url: '/time-table',
  Component: TimetablePage,
  exact: true,
};
