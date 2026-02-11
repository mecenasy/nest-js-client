import api from '../api';
import { AxiosResponse } from 'axios';
import { userListStudents, userListAll, userListTeacher, userSimpleList } from './paths';
import { ListType, UserListState } from '~/src/store/userList/constants';

export const getUsers = async (query: string, type: ListType): Promise<AxiosResponse<UserListState>> => {

  let path
  switch (type) {
    case ListType.Student:
      path = userListStudents;
      break;
    case ListType.Teacher:
      path = userListTeacher;
      break;
    default:
      path = userListAll;
      break;
  }
  return await api.get(`${path}${query}`);
};

export const getSimpleUsers = async (type: ListType): Promise<AxiosResponse<UserListState>> => {
  return await api.get(`${userSimpleList}/${type}`);
};

