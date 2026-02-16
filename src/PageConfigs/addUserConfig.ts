import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const AddUserPage = Loadable({
  loader: async () => import('../Pages/AddUserPage'),
  loading: Loader,
});

export const addUserConfig: PageConfig = {
  url: '/add_user',
  Component: AddUserPage,
  exact: true,
};
