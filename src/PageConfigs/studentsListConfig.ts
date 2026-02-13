import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUserListRequest } from '../store/userList/reducer';
import { ListType } from '../store/userList/constants';

const StudentListPage = Loadable({
  loader: async () => import('../Pages/StudentListPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => [
  Boolean((isMount && isHydrated) || isServer) && getUserListRequest({ searchParam: location.search ?? '', listType: ListType.Student }),
]

export const studentsListConfig: PageConfig = {
  url: '/students_list',
  Component: StudentListPage,
  exact: true,

}
