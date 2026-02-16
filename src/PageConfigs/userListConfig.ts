import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const UserListPage = Loadable({
  loader: async () => import('../Pages/UserListPage'),
  loading: Loader,
});

export const userListConfig: PageConfig = {
  url: '/user_list',
  Component: UserListPage,
  exact: true,
};
