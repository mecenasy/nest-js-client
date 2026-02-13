import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUserListRequest } from '../store/userList/reducer';
import { ListType } from '../store/userList/constants';

const TeacherListPage = Loadable({
  loader: async () => import('../Pages/TeacherListPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }, location) => [
  Boolean((isMount && isHydrated) || isServer)
  && getUserListRequest({ searchParam: location.search ?? '', listType: ListType.Teacher }),
]

export const teachersListConfig: PageConfig = {
  url: '/teacher_list',
  Component: TeacherListPage,
  exact: true,

}
