import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getRoleRequest } from '../store/role/actions';
import { getStudentRequest } from '../store/student/actions';

const AddUserPage = Loadable({
  loader: async () => import('../Pages/AddUserPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => [
  Boolean((isMount && isHydrated) || isServer) && getRoleRequest(),
  Boolean((isMount && isHydrated) || isServer) && getStudentRequest(),
];

export const addUserConfig: PageConfig = {
  url: '/add_user',
  Component: AddUserPage,
  exact: true,
}
