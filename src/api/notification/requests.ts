import api from '../api';
import { AxiosResponse } from 'axios';
import { NotificationState } from '~/src/store/notification/constants';
import { notification } from './paths';

export const getNotification = async (): Promise<AxiosResponse<NotificationState>> => {
  return await api.get(notification);
};
