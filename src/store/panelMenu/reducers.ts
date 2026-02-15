import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, MenuItem, MenuItemData } from "./constants";
import { logoutSuccess } from '../auth/reducers';

export const getMenuItemsRequest = createAction('menu/getMenuItemsRequest');
export const addMenuItemsRequest = createAction<MenuItemData & PromiseFParams>('menu/addMenuItemsRequest');
export const removeMenuItemsRequest = createAction<string>('menu/removeMenuItemsRequest');

export const getMenuItemsFail = createAction<string>('menu/getMenuItemsFail');
export const addMenuItemsFail = createAction<string>('menu/addMenuItemsFail');
export const removeMenuItemsFail = createAction<string>('menu/removeMenuItemsFail');

const menuItemsSlice = createSlice({
  name: 'panelMenu',
  initialState,
  reducers: {
    getMenuItemsSuccess: (_, action: PayloadAction<MenuItem[]>) => {
      return action.payload;
    },
    addMenuItemsSuccess: (state, action: PayloadAction<MenuItem>) => {
      return [...state, action.payload];
    },
    removeMenuItemsSuccess: (state, action: PayloadAction<string>) => {
      return state.filter((item) => item.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    getMenuItems: (state) => state,
  }
});

export const panelMenuReducer = menuItemsSlice.reducer;
export const {
  getMenuItemsSuccess,
  addMenuItemsSuccess,
  removeMenuItemsSuccess
} = menuItemsSlice.actions;
export const { getMenuItems } = menuItemsSlice.selectors;
