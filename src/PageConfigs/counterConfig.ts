import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const Counter = Loadable({
  loader: async () => import('../Pages/CounterPage'),
  loading: Loader,
});

export const counterConfig: PageConfig = {
  url: '/counter',
  Component: Counter,
};
