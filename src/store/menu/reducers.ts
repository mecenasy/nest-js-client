import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { logoutSuccess } from "../auth/reducers";
import { initialState, Menu } from "./constants";

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    getMenuSuccess: (_, action: PayloadAction<Menu[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  }
});

export const menuReducer = menuSlice.reducer;
export const { getMenuSuccess, } = menuSlice.actions;

export const getMenuRequest = createAction('menu/getMenuRequest');
export const getMenuFail = createAction<string>('menu/getMenuFail');
