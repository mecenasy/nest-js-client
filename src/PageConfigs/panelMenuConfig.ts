import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getRoleRequest } from '../store/role/actions';
import { getMenuItemsRequest } from '../store/panelMenu/menu/actions';

const PanelMenu = Loadable({
  loader: async () => import('../Pages/PanelMenuPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isServer, isHydrated }) => {
  return [
    Boolean((isMount && isHydrated) || isServer) && getRoleRequest(),
    Boolean((isMount && isHydrated) || isServer) && getMenuItemsRequest(),
  ]
}

export const panelMenuConfig: PageConfig = {
  url: '/panel_menu',
  Component: PanelMenu,
};
