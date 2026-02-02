import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUserListRequest } from '../store/userList/actions';
import { RoleType } from '../store/role/constants';

const TeacherListPage = Loadable({
  loader: async () => import('../Pages/TeacherListPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => [
  Boolean((isMount && isHydrated) || isServer)
  && getUserListRequest(location.search ?? '', RoleType.Teacher),
]

export const teachersListConfig: PageConfig = {
  url: '/teacher_list',
  Component: TeacherListPage,
  exact: true,

}
