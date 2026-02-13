import { MenuItemData } from '~/src/store/panelMenu/constants';

export const validateMenuItem = (value: MenuItemData) => {
  const error: Partial<Record<keyof MenuItemData, string>> = {};

  if (!value?.name) {
    error.name = 'nazwa menu misi być podana';
  }
  if (!value?.link) {
    error.link = 'link musi być podany';
  }
  if (!value?.menuSide) {
    error.menuSide = 'strona musi być podana';
  }
  if (!value?.position) {
    error.position = 'pozycja menu musi być podana';
  }
  if (!value?.role?.length) {
    error.role = 'rola urzytkownika menu musi być podana';
  }
  if (!(value?._id || value?.image)) {
    error.menuSide = 'ikona musi zostać dodana';
  }
  return error;
};
