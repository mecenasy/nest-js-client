import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, NotificationState } from './constants';
import { logoutSuccess } from '../auth/reducers';

export const getNotificationRequest = createAction('notification/getNotificationRequest');
export const getNotificationFail = createAction<string>('notification/getNotificationFail');
export const notificationStart = createAction('notification/notificationStart');
export const notificationEnd = createAction('notification/notificationEnd');

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationSuccess: (state, action: PayloadAction<NotificationState>) => {
      return { ...state, ...action.payload };
    },
    setUnReadMessage: (state, action: PayloadAction<number>) => {
      state.unReadMessage = action.payload;
    },
    unReadUp: (state) => {
      state.unReadMessage += 1;
    },
    unReadDown: (state) => {
      state.unReadMessage -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    unReadSelector: (state: NotificationState) => state.unReadMessage,
  }
});

export const notificationReducer = notificationSlice.reducer;
export const { unReadSelector } = notificationSlice.selectors;
export const {
  getNotificationSuccess,
  setUnReadMessage,
  unReadUp,
  unReadDown
} = notificationSlice.actions;
