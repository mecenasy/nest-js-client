import api from '../api';
import { menu } from './paths';

export const getMenu = async () => {
  return await api.get(menu)
};
