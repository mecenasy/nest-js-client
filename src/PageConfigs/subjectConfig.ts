import Loadable from '@react-loadable/revised';
import { PageConfig } from "./constants";
import Loader from "../modules/Loader/Loader";

const Subject = Loadable({
  loader: async () => import('../Pages/SubjectPage'),
  loading: Loader,
});

export const subjectConfig: PageConfig = {
  url: '/subject',
  Component: Subject,
};
