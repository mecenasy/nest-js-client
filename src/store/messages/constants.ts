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