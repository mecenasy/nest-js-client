import { combineReducers } from '@reduxjs/toolkit';
import { menuItemsReducer } from './menu/reducers';
import { MenuPanelReducer } from './constants';
import { roleReducer } from '../role/reducer';

export const panelMenuReducer = combineReducers<MenuPanelReducer>({
  role: roleReducer,
  menu: menuItemsReducer,
})