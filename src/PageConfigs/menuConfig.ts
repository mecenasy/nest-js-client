import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const Menu = Loadable({
  loader: async () => import('../Pages/MenuPage'),
  loading: Loader,
});

export const menuConfig: PageConfig = {
  extrudeUrl: ['/login', '/logout', '/change_password'],
  url: '*',
  Component: Menu,
};
