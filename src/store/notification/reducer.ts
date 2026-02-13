import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, NotificationState } from './constants';
import { logoutSuccess } from '../auth/reducers';

export const getNotificationRequest = createAction('notification/GetNotificationRequest');
export const getNotificationFail = createAction<string>('notification/GetNotificationFail');
export const notificationStart = createAction('notification/notificationStart');
export const notificationEnd = createAction('notification/notificationEnd');

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    getNotificationSuccess: (state, action: PayloadAction<NotificationState>) => {
      return { ...state, ...action.payload };
    },
    setUnReadedMessage: (state, action: PayloadAction<number>) => {
      state.unReadedMessage = action.payload;
    },
    unReadedUp: (state) => {
      state.unReadedMessage += 1;
    },
    unReadedDown: (state) => {
      state.unReadedMessage -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    unReadedSelector: (state: NotificationState) => state.unReadedMessage,
  }
});

export const notificationReducer = notificationSlice.reducer;
export const { unReadedSelector } = notificationSlice.selectors;
export const {
  getNotificationSuccess,
  setUnReadedMessage,
  unReadedUp,
  unReadedDown
} = notificationSlice.actions;
