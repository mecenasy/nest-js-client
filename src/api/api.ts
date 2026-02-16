import axios from 'axios';
import { basePath, authorizationHeaders } from './apiConfig';

const axiosInstance = axios.create({
  responseType: 'json',
  baseURL: basePath,
  headers: authorizationHeaders,
});

let authorizationTokenProvider: () => string | undefined;

axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use((request) => {
  if (authorizationTokenProvider) {
    const token = authorizationTokenProvider();

    if (token) {
      request.headers.authorization = 'Bearer ' + token;
    }
  }
  return request;
});

export const setAuthorizationProvider = (provider: () => string | undefined) => {
  authorizationTokenProvider = provider;
};

export default axiosInstance;
