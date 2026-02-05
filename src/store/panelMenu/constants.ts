import { Reducer } from 'redux';
import { MenuItemAction, MenuItemsState } from "./menu/constants";
import { RoleAction } from '../role/constants';
import { AuthAction } from '../auth/constants';

export interface MenuPanelState {
  role: string[];
  menu: MenuItemsState
}
export interface MenuPanelReducer {
  role: Reducer<string[], RoleAction | AuthAction>;
  menu: Reducer<MenuItemsState, MenuItemAction>
}