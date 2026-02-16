import Loadable from '@react-loadable/revised';
import { PageConfig } from './constants';
import Loader from '../modules/Loader/Loader';

const Grades = Loadable({
  loader: async () => import('../Pages/GradesStudentPage'),
  loading: Loader,
});

export const gradesStudentConfig: PageConfig = {
  url: '/grade-student',
  Component: Grades,
};
