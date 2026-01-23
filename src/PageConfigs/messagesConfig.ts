import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";

const MessagesPage = Loadable({
  loader: async () => import('../Pages/AddUserPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = () => [];

export const messagesConfig: PageConfig = {
  url: '/messages',
  Component: MessagesPage,
  exact: true,
}
