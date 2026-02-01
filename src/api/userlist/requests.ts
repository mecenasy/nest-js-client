import api from '../api';
import { AxiosResponse } from 'axios';
import { userList } from './paths';
import { SelectedFilters, UserList } from '~/src/store/userList/constants';

export const getUsers = async (params: SelectedFilters): Promise<AxiosResponse<UserList>> => {
  const convertedParams: Record<string, string> = {};
  const keys = Object.keys(params);
  keys.forEach((key) => {
    if (Array.isArray(params[key])) {
      convertedParams[key] = (params[key] as string[]).join(',');
    } else {
      convertedParams[key] = params[key] as string;
    }
  })

  const searchParam = new URLSearchParams(convertedParams);

  return await api.get(userList + '?' + searchParam.toString());
};

