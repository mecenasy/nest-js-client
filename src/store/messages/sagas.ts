import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import {
  MessageActionType,
  MessageList,
  Message,
  MessageAction,
} from './constants';
import {
  sendMessageSuccess,
  sendMessageFail,
  getMessageListSuccess,
  getMessageListFail,
  getMessageSuccess,
  getMessageFail,
  getFileSuccess,
  getFileFail,
} from './actions';
import { getFile, getMessage, getMessages, sendMessage, setReadedMessage } from '~/src/api/messages/requests';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';

function* sendMessageWorker(action: ExtractByType<MessageAction, MessageActionType.SendMessageRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      yield call(sendMessage, action.payload);
      yield put(sendMessageSuccess());
    } catch {
      yield put(sendMessageFail());
    }
  }
}

function* getMessageListWorker(action: ExtractByType<MessageAction, MessageActionType.GetMessageListRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: AxiosResponse<MessageList> = yield call(getMessages, action.payload);
      yield put(getMessageListSuccess(data));
    } catch {
      yield put(getMessageListFail());
    }
  }
}

function* getMessageWorker(action: ExtractByType<MessageAction, MessageActionType.GetMessageRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const response: AxiosResponse<Message> = yield call(getMessage, action.payload);
      yield put(getMessageSuccess(response.data));
    } catch {
      yield put(getMessageFail());
    }
  }
}

function* getFileWorker(action: ExtractByType<MessageAction, MessageActionType.GetFileRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {

      const fileName = action.file.name;
      const response: AxiosResponse<Blob> = yield call(getFile, action.file.path);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      yield put(getFileSuccess());
    } catch {
      yield put(getFileFail());
    }
  }
}

function* readedMessageWorker(action: ExtractByType<MessageAction, MessageActionType.SetReadedMessageRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    yield call(setReadedMessage, action.messageId);
  }
}

export function* messageWatcher() {
  yield all([
    takeLatest(MessageActionType.SetReadedMessageRequest, readedMessageWorker),
    takeLatest(MessageActionType.SendMessageRequest, sendMessageWorker),
    takeLatest(MessageActionType.GetMessageListRequest, getMessageListWorker),
    takeLatest(MessageActionType.GetMessageRequest, getMessageWorker),
    takeLatest(MessageActionType.GetFileRequest, getFileWorker),
  ]);
}