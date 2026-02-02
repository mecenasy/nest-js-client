import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUserListRequest } from '../store/userList/actions';
import { RoleType } from '../store/role/constants';

const StudentListPage = Loadable({
  loader: async () => import('../Pages/StudentListPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => [
  Boolean((isMount && isHydrated) || isServer) && getUserListRequest(location.search ?? '', RoleType.Student),
]

export const studentsListConfig: PageConfig = {
  url: '/students_list',
  Component: StudentListPage,
  exact: true,

}
