import Loadable from '@react-loadable/revised';
import { PageConfig, ActionCreatorFactory } from "./constants";
import Loader from "../modules/Loader/Loader";
import { getUniversityRequest } from '../store/university/actions';
import { getSimpleUserListRequest, getUserListRequest } from '../store/userList/actions';
import { getSubjectsRequest } from '../store/subject/actions';
import { ListType } from '../store/userList/constants';

const Subject = Loadable({
  loader: async () => import('../Pages/SubjectPage'),
  loading: Loader,
});


export const actionCreator: ActionCreatorFactory = ({ isMount, isHydrated, isServer }) => [
  Boolean((isMount && isHydrated) || isServer) && getUniversityRequest(),
  Boolean((isMount && isHydrated) || isServer) && getSubjectsRequest(),
  Boolean((isMount && isHydrated) || isServer) && getSimpleUserListRequest(ListType.OnlyTeacher),
];


export const subjectConfig: PageConfig = {
  url: '/subject',
  Component: Subject,
};
