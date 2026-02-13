import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUniversityRequest } from '../store/university/reducer';
import { getRoleRequest } from '../store/role/actions';

const AddUserPage = Loadable({
  loader: async () => import('../Pages/AddUserPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => [
  Boolean((isMount && isHydrated) || isServer) && getRoleRequest(),
  Boolean((isMount && isHydrated) || isServer) && getUniversityRequest(),
];

export const addUserConfig: PageConfig = {
  url: '/user_list',
  Component: AddUserPage,
  exact: true,
}
