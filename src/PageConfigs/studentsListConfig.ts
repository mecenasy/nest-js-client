import Loadable from '@react-loadable/revised';
import { PageConfig } from "./constants";
import Loader from "../modules/Loader/Loader";

const StudentListPage = Loadable({
  loader: async () => import('../Pages/StudentListPage'),
  loading: Loader,
});

export const studentsListConfig: PageConfig = {
  url: '/students_list',
  Component: StudentListPage,
  exact: true,

}
