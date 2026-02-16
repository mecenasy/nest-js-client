import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const Logout = Loadable({
  loader: async () => import('../Pages/LogoutPage'),
  loading: Loader,
});

export const logoutConfig: PageConfig = {
  url: '/logout',
  Component: Logout,
};
