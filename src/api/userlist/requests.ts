import api from '../api';
import { AxiosResponse } from 'axios';
import { userListStudents, userListAll, userListTeacher } from './paths';
import { UserList } from '~/src/store/userList/constants';
import { RoleType } from '~/src/store/person/constants';

export const getUsers = async (query: string, type: RoleType): Promise<AxiosResponse<UserList>> => {

  let path
  switch (type) {
    case RoleType.Student:
      path = userListTeacher;
      break;
    case RoleType.Teacher:
      path = userListStudents;
      break;
    default:
      path = userListAll;
      break;
  }
  return await api.get(path + query);
};

