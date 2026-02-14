import Loadable from '@react-loadable/revised';
import Loader from '../modules/Loader/Loader';
import { PageConfig } from './constants';

const Login = Loadable({
  loader: async () => import('../Pages/LoginPage'),
  loading: Loader,
});

export const loginConfig: PageConfig = {
  url: '/login',
  Component: Login,
};
