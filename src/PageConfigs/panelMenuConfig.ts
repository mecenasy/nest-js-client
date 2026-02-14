import Loadable from '@react-loadable/revised';
import { PageConfig } from "./constants";
import Loader from "../modules/Loader/Loader";

const PanelMenu = Loadable({
  loader: async () => import('../Pages/PanelMenuPage'),
  loading: Loader,
});

export const panelMenuConfig: PageConfig = {
  url: '/panel_menu',
  Component: PanelMenu,
};
