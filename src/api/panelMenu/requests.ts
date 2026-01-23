import { MenuItemData, MenuItemField } from '~/src/store/panelMenu/menu/constants';
import api from '../api';
import { role, menu, student } from './paths';

export const getRole = async () => {
  return await api.get(role);
};

export const getStudentData = async () => {
  return await api.get(student)
};
export const getMenu = async () => {
  return await api.get(menu)
};

export const removeMenuItem = async (id: string) => {
  return await api.delete(`${menu}/${id}`)
};

export const addMenuItem = (form: MenuItemData) => {
  const data: FormData = new FormData();

  data.append(MenuItemField.Name, form.name);
  data.append(MenuItemField.Link, form.link);
  data.append(MenuItemField.Side, form.menuSide);
  data.append(MenuItemField.Role, JSON.stringify(form.role.map(({ value }) => value)));
  data.append(MenuItemField.Position, form.position.toString());

  if (form._id) {
    data.append(MenuItemField.Id, form._id);
  }
  if (form.shortName) {
    data.append(MenuItemField.ShortName, form.shortName);
  }
  if (form.hidden) {
    data.append(MenuItemField.Hidden, form.hidden.toString());
  }
  if (form.image?.name) {
    data.append(MenuItemField.Image, form.image, form.image.name);
  }

  return api.post(menu, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};