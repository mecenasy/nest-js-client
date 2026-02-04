import {
  MessageActionType,
  MessageData,
  MessageList,
  Message,
  MessageAction,
  File
} from './constants';

export const sendMessageRequest = (data: MessageData): MessageAction => ({
  type: MessageActionType.SendMessageRequest,
  payload: data,
});

export const sendMessageSuccess = (): MessageAction => ({
  type: MessageActionType.SendMessageSuccess,
});

export const sendMessageFail = (): MessageAction => ({
  type: MessageActionType.SendMessageFail,
});

export const getMessageListRequest = (query: string): MessageAction => ({
  type: MessageActionType.GetMessageListRequest,
  payload: query,
});

export const getMessageListSuccess = (list: MessageList): MessageAction => ({
  type: MessageActionType.GetMessageListSuccess,
  payload: list,
});

export const getMessageListFail = (): MessageAction => ({
  type: MessageActionType.GetMessageListFail,
});

export const getMessageRequest = (id: string): MessageAction => ({
  type: MessageActionType.GetMessageRequest,
  payload: id,
});

export const getMessageSuccess = (message: Message): MessageAction => ({
  type: MessageActionType.GetMessageSuccess,
  payload: message,
});

export const getMessageFail = (): MessageAction => ({
  type: MessageActionType.GetMessageFail,
});

export const getFileRequest = (file: File): MessageAction => ({
  type: MessageActionType.GetFileRequest,
  file,
});

export const getFileSuccess = (): MessageAction => ({
  type: MessageActionType.GetFileSuccess,
});

export const getFileFail = (): MessageAction => ({
  type: MessageActionType.GetFileFail,
});