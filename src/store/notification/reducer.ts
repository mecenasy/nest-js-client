import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, NotificationState } from './constants';

export const GetNotificationRequest = createAction('notification/GetNotificationRequest');
export const notificationStart = createAction('notification/notificationStart');
export const notificationEnd = createAction('notification/notificationEnd');

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    GetNotificationSuccess: (state, action: PayloadAction<NotificationState>) => {
      return { ...state, ...action.payload };
    },
    GetNotificationFail: () => {},
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

  selectors: {
    unReadedSelector: (state: NotificationState) => state.unReadedMessage,
  }
});

export const notificationReducer = notificationSlice.reducer;
export const { unReadedSelector } = notificationSlice.selectors;
export const {
  GetNotificationSuccess,
  GetNotificationFail,
  setUnReadedMessage,
  unReadedUp,
  unReadedDown
} = notificationSlice.actions;
