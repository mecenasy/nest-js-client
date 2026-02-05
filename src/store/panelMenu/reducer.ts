import { combineReducers } from 'redux';
import { roleReducer } from '../role/reducer';
import { menuItemsReducer } from './menu/reducers';
import { MenuPanelReducer } from './constants';

export const panelMenuReducer = combineReducers<MenuPanelReducer>({
  role: roleReducer,
  menu: menuItemsReducer,
})