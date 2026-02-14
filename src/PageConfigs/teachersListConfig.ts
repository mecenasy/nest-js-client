import Loadable from '@react-loadable/revised';
import { PageConfig } from "./constants";
import Loader from "../modules/Loader/Loader";

const TeacherListPage = Loadable({
  loader: async () => import('../Pages/TeacherListPage'),
  loading: Loader,
});

export const teachersListConfig: PageConfig = {
  url: '/teacher_list',
  Component: TeacherListPage,
  exact: true,

}
