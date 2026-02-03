export interface Message {
  id: string;
  createdAt: Date;
  title: string;
  content: string;
  from: string;
  replies?: Message[];
  to: string;
  files?: string[];
}

export interface MessageData {
  title: string;
  content: string;
  to: string;
  parent?: string;
  files?: string[];
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export interface MessageList {
  messageList: SimpleMessage[];
  pagination: Pagination;
}

export interface SimpleMessage {
  id: string;
  title: string;
  isReaded: boolean;
}

export interface MessageState extends MessageList {
  messages: Record<string, Message>;
  isFetching: boolean;
}