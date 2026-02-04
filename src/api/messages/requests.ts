import api from '../api';
import { AxiosResponse } from 'axios';
import { MessageData, MessageList, Message } from '~/src/store/messages/constants';
import { messageSend, messageAll, messageById } from './paths';

export const sendMessage = async (data: MessageData): Promise<AxiosResponse<void>> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('content', data.content);
  formData.append('to', data.to);
  if (data.parent) {
    formData.append('parent', data.parent);
  }

  if (data.files) {
    data.files.forEach((file) => {
      formData.append('files', file, file.name);
    });
  }

  return await api.post(messageSend, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getMessages = async (query: string): Promise<AxiosResponse<MessageList>> => {
  return await api.get(`${messageAll}${query}`);
};

export const getMessage = async (id: string): Promise<AxiosResponse<Message>> => {
  return await api.get(`${messageById}/${id}`);
};

export const getFile = async (path: string): Promise<AxiosResponse<any>> => {
  return await api.get(path, { responseType: 'blob' });
};