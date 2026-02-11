import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUserListRequest } from '../store/userList/actions';
import { ListType } from '../store/userList/constants';

const UserListPage = Loadable({
  loader: async () => import('../Pages/UserListPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => [
  Boolean((isMount && isHydrated) || isServer) && getUserListRequest(location.search ?? '', ListType.Admin),
]

export const userListConfig: PageConfig = {
  url: '/user_list',
  Component: UserListPage,
  exact: true,
}
