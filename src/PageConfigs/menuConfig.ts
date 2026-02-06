import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getMenuRequest } from "../store/menu/actions";
import { getPersonRequest } from '../store/person/actions';
import { GetNotificationRequest, notificationStart } from '../store/notification/actions';

const Menu = Loadable({
  loader: async () => import('../Pages/MenuPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer, isUpdate }) => [
  Boolean((isHydrated && isMount && !isUpdate) || isServer) && getMenuRequest(),
  Boolean((isHydrated && isMount && !isUpdate) || isServer) && getPersonRequest(),
  Boolean((isHydrated && isMount && !isUpdate) || isServer) && GetNotificationRequest(),
  Boolean(isMount && !isUpdate) && notificationStart(),
]

export const menuConfig: PageConfig = {
  extrudeUrl: ['/login', '/logout', '/change_password'],
  url: '/*',
  Component: Menu,
}
