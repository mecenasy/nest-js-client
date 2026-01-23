import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";

const SettingsPage = Loadable({
  loader: async () => import('../Pages/SettingsPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = () => [];

export const settingsConfig: PageConfig = {
  url: '/settings',
  Component: SettingsPage,
  exact: true,
}
