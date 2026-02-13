import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getMessageListRequest, getMessageRequest } from '../store/messages/reducer';

const MessagesPage = Loadable({
  loader: async () => import('../Pages/MessagesPage'),
  loading: Loader,
});

export const actionCreator: ActionCreatorFactory = ({ isHydrated, isMount, isServer }, location) => [
  Boolean(((isHydrated && isMount) || isServer) && !location.search) && getMessageListRequest(''),
  Boolean(((isHydrated && isMount) || isServer) && location.search)
  && getMessageRequest(new URLSearchParams(location.search).get('messageId') ?? ''),
];

export const messagesConfig: PageConfig = {
  url: '/messages',
  Component: MessagesPage,
  exact: true,
}
