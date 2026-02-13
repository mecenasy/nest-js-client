import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getMenuItemsRequest } from '../store/panelMenu/reducers';
import { getRoleRequest } from '../store/role/reducer';

const PanelMenu = Loadable({
  loader: async () => import('../Pages/PanelMenuPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isServer, isHydrated }) => [
  Boolean((isMount && isHydrated) || isServer) && getRoleRequest(),
  Boolean((isMount && isHydrated) || isServer) && getMenuItemsRequest(),
]


export const panelMenuConfig: PageConfig = {
  url: '/panel_menu',
  Component: PanelMenu,
};
