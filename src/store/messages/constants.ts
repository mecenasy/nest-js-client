import { DroppedFile, Option } from '~/src/modules/Components/Input/types';

export interface Message {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  from: string;
  replies?: Message[];
  to: string;
  files?: File[];
  isReaded: boolean;
}

export interface File {
  name: string;
  path: string;
}


export enum MessageField {
  Title = 'title',
  Content = 'content',
  To = 'to',
  Parent = 'parent',
  Files = 'files',
}

export interface MessageData {
  title: string;
  content: string;
  to: string;
  parent?: string;
  files?: DroppedFile[];
}
export interface MessageFormData {
  title: string;
  content: string;
  to: Option<string>;
  parent?: string;
  files?: DroppedFile[];
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface MessageList {
  messages: SimpleMessage[];
  pagination: Pagination;
}

export interface SimpleMessage {
  id: string;
  title: string;
  isReaded: boolean;
}

export interface MessageState extends MessageList {
  messageDi: Record<string, Message>;
  isFetching: boolean;
  unReaded: number;
}

export enum MessageActionType {
  SendMessageRequest = 'message/SEND_MESSAGE_REQUEST',
  SendMessageSuccess = 'message/SEND_MESSAGE_SUCCESS',
  SendMessageFail = 'message/SEND_MESSAGE_FAIL',

  GetMessageListRequest = 'message/GET_MESSAGE_LIST_REQUEST',
  GetMessageListSuccess = 'message/GET_MESSAGE_LIST_SUCCESS',
  GetMessageListFail = 'message/GET_MESSAGE_LIST_FAIL',

  GetMessageRequest = 'message/GET_MESSAGE_REQUEST',
  GetMessageSuccess = 'message/GET_MESSAGE_SUCCESS',
  GetMessageFail = 'message/GET_MESSAGE_FAIL',

  GetFileRequest = 'message/GET_FILE_REQUEST',
  GetFileSuccess = 'message/GET_FILE_SUCCESS',
  GetFileFail = 'message/GET_FILE_FAIL',

  SetReadedMessageRequest = 'message/SET_READED_MESSAGE_REQUEST',
}

export type MessageAction = {
  type: MessageActionType.SendMessageRequest;
  payload: MessageData;
} | {
  type: MessageActionType.SendMessageSuccess;
} | {
  type: MessageActionType.SendMessageFail;
} | {
  type: MessageActionType.GetMessageListRequest;
  payload: string;
} | {
  type: MessageActionType.GetMessageListSuccess;
  payload: MessageList;
} | {
  type: MessageActionType.GetMessageListFail;
} | {
  type: MessageActionType.GetMessageRequest;
  payload: string;
} | {
  type: MessageActionType.GetMessageSuccess;
  payload: Message;
} | {
  type: MessageActionType.SetReadedMessageRequest;
  messageId: string;
} | {
  type: MessageActionType.GetMessageFail;
} | {
  type: MessageActionType.GetFileRequest;
  file: File;
} | {
  type: MessageActionType.GetFileSuccess;
} | {
  type: MessageActionType.GetFileFail;
}

export const initialState: MessageState = {
  messages: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
    totalPages: 0,
    totalItems: 0,
  },
  messageDi: {},
  isFetching: false,
  unReaded: 0
};