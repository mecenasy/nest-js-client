import api from '../api';
import { AxiosResponse } from 'axios';
import { userListStudents, userListAll, userListTeacher } from './paths';
import { UserListState } from '~/src/store/userList/constants';
import { RoleType } from '~/src/store/person/constants';

export const getUsers = async (query: string, type: RoleType): Promise<AxiosResponse<UserListState>> => {

  let path
  switch (type) {
    case RoleType.Student:
      path = userListStudents;
      break;
    case RoleType.Teacher:
      path = userListTeacher;
      break;
    default:
      path = userListAll;
      break;
  }
  return await api.get(`${path}${query}`);
};

