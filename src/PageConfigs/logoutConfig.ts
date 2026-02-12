import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { logoutRequest } from '../store/auth/reducers';

const Logout = Loadable({
  loader: async () => import('../Pages/LogoutPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isServer, isMount }) => [
  Boolean(isServer || isMount) && logoutRequest(),
]

export const logoutConfig: PageConfig = {
  url: '/logout',
  Component: Logout,
};
