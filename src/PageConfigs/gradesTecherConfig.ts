import Loadable from '@react-loadable/revised';
import { PageConfig } from "./constants";
import Loader from "../modules/Loader/Loader";

const Grades = Loadable({
  loader: async () => import('../Pages/GradesTeacherPage'),
  loading: Loader,
});

export const gradesStudentConfig: PageConfig = {
  url: '/grade/teacher',
  Component: Grades,
}
