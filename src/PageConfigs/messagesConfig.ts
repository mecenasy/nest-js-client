import Loadable from '@react-loadable/revised';
import { PageConfig } from "./constants";
import Loader from "../modules/Loader/Loader";

const MessagesPage = Loadable({
  loader: async () => import('../Pages/MessagesPage'),
  loading: Loader,
});

export const messagesConfig: PageConfig = {
  url: '/messages',
  Component: MessagesPage,
  exact: true,
}
