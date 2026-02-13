import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUserListRequest } from '../store/userList/reducer';
import { ListType } from '../store/userList/constants';

const UserListPage = Loadable({
  loader: async () => import('../Pages/UserListPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => [
  Boolean((isMount && isHydrated) || isServer) && getUserListRequest({ searchParam: location.search ?? '', listType: ListType.Admin }),
]

export const userListConfig: PageConfig = {
  url: '/user_list',
  Component: UserListPage,
  exact: true,
}
