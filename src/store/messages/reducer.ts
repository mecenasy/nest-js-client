import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, MessageList, Message, MessageData, File } from './constants';
import { logoutSuccess } from '../auth/reducers';

export const sendMessageRequest = createAction<MessageData & PromiseFParams>('message/sendMessageRequest');
export const getMessageListRequest = createAction<string>('message/getMessageListRequest');
export const getMessageRequest = createAction<string>('message/getMessageRequest');
export const getFileRequest = createAction<File>('message/getFileRequest');
export const readMessageRequest = createAction<string>('message/readMessageRequest');

export const sendMessageFail = createAction<string>('message/sendMessageFail');
export const getMessageListFail = createAction<string>('message/getMessageListFail');
export const getMessageFail = createAction<string>('message/getMessageFail');
export const getFileFail = createAction<string>('message/getFileFail');
export const readMessageFail = createAction<string>('message/readMessageFail');

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    sendMessageSuccess: (state) => {
      state.isFetching = false;
    },
    sendMessageFail: (state) => {
      state.isFetching = false;
    },
    getMessageListSuccess: (state, action: PayloadAction<MessageList>) => {
      state.isFetching = false;
      state.messages = action.payload.messages;
      state.pagination = action.payload.pagination;
    },
    getMessageListFail: (state) => {
      state.isFetching = false;
    },
    getMessageSuccess: (state, action: PayloadAction<Message>) => {
      state.isFetching = false;
      state.messageDi[action.payload.id] = action.payload;
    },
    getMessageFail: (state) => {
      state.isFetching = false;
    },
    getFileSuccess: () => {},
    getFileFail: () => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutSuccess, () => initialState)
      .addCase(sendMessageRequest, (state) => { state.isFetching = true; })
      .addCase(getMessageListRequest, (state) => { state.isFetching = true; })
      .addCase(getMessageRequest, (state) => { state.isFetching = true; })
      .addCase(sendMessageFail, (state) => { state.isFetching = true; })
      .addCase(getMessageListFail, (state) => { state.isFetching = true; })
      .addCase(getMessageFail, (state) => { state.isFetching = true; })
  }
});

export const messageReducer = messageSlice.reducer;
export const {
  sendMessageSuccess,
  getMessageListSuccess,
  getMessageSuccess,
  getFileSuccess,
} = messageSlice.actions;
