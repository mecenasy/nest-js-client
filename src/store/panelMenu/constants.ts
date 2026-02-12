import { Reducer, UnknownAction } from 'redux';
import { MenuItemAction, MenuItemsState } from "./menu/constants";

export interface MenuPanelState {
  role: string[];
  menu: MenuItemsState
}
export interface MenuPanelReducer {
  role: Reducer<string[], UnknownAction>;
  menu: Reducer<MenuItemsState, MenuItemAction>
}