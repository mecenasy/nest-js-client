import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getMenuRequest } from "../store/menu/actions";
import { getPersonRequest } from '../store/person/actions';

const Menu = Loadable({
  loader: async () => import('../Pages/MenuPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => [
  Boolean((isHydrated && isMount) || isServer) && getMenuRequest(),
  Boolean((isHydrated && isMount) || isServer) && getPersonRequest(),
];

export const menuConfig: PageConfig = {
  extrudeUrl: ['/login', '/logout', '/change_password'],
  url: '/',
  Component: Menu,
}
