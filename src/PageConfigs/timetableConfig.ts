import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";

const TimetablePage = Loadable({
  loader: async () => import('../Pages/TimetablePage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = () => [];

export const timetableConfig: PageConfig = {
  url: '/timetable',
  Component: TimetablePage,
  exact: true,
}
