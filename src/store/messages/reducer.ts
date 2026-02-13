import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, MessageList, Message, MessageData, File } from './constants';

export const sendMessageRequest = createAction<MessageData>('message/sendMessageRequest');
export const getMessageListRequest = createAction<string>('message/getMessageListRequest');
export const getMessageRequest = createAction<string>('message/getMessageRequest');
export const getFileRequest = createAction<File>('message/getFileRequest');
export const readedMessageRequest = createAction<string>('message/readedMessageRequest');

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
      .addCase(sendMessageRequest, (state) => { state.isFetching = true; })
      .addCase(getMessageListRequest, (state) => { state.isFetching = true; })
      .addCase(getMessageRequest, (state) => { state.isFetching = true; });
  }
});

export const messageReducer = messageSlice.reducer;
export const {
  sendMessageSuccess,
  sendMessageFail,
  getMessageListSuccess,
  getMessageListFail,
  getMessageSuccess,
  getMessageFail,
  getFileSuccess,
  getFileFail
} = messageSlice.actions;
