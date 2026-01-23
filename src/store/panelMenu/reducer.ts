import { combineReducers } from 'redux';
import { roleReducer } from '../role/reducer';
import { menuItemsReducer } from './menu/reducers';
import { MenuPanelState } from './constants';

export const panelMenuReducer = combineReducers<MenuPanelState>({
  role: roleReducer,
  menu: menuItemsReducer,
})