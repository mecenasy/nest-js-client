import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import {
  MessageList,
  Message,
} from './constants';
import * as A from './reducer';
import { getFile, getMessage, getMessages, sendMessage, setReadedMessage } from '~/src/api/messages/requests';
import { LoggedStatus } from '../auth/constants';
import { waitForAuthStatus } from '../auth/sagas';

function* sendMessageWorker(action: ReturnType<typeof A.sendMessageRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      yield call(sendMessage, action.payload);
      yield put(A.sendMessageSuccess());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.sendMessageFail(error.message));
      }
    }
  }
}

function* getMessageListWorker(action: ReturnType<typeof A.getMessageListRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const { data }: AxiosResponse<MessageList> = yield call(getMessages, action.payload);
      yield put(A.getMessageListSuccess(data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getMessageListFail(error.message));
      }
    }
  }
}

function* getMessageWorker(action: ReturnType<typeof A.getMessageRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const response: AxiosResponse<Message> = yield call(getMessage, action.payload);
      yield put(A.getMessageSuccess(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getMessageFail(error.message));
      }
    }
  }
}

function* getFileWorker(action: ReturnType<typeof A.getFileRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {

      const fileName = action.payload.name;
      const response: AxiosResponse<Blob> = yield call(getFile, action.payload.path);
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      yield put(A.getFileSuccess());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.getFileFail(error.message));
      }
    }
  }
}

function* readedMessageWorker(action: ReturnType<typeof A.readedMessageRequest>) {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    yield call(setReadedMessage, action.payload);
  }
}

export function* messageWatcher() {
  yield all([
    takeLatest(A.readedMessageRequest.type, readedMessageWorker),
    takeLatest(A.sendMessageRequest.type, sendMessageWorker),
    takeLatest(A.getMessageListRequest.type, getMessageListWorker),
    takeLatest(A.getMessageRequest.type, getMessageWorker),
    takeLatest(A.getFileRequest.type, getFileWorker),
  ]);
}
