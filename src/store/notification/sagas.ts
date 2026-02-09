import { takeLatest, call, put, select, take, cancelled, race, } from 'redux-saga/effects';
import { EventChannel, eventChannel } from 'redux-saga';
import {
  NotificationActionType,
} from './constants';
import {
  GetNotificationFail,
  GetNotificationSuccess,
  unReadedUp
} from './actions';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { userIdSelector, userTokenSelector } from '../auth/selectors';
import { basePath } from '~/src/api/apiConfig';
import { AxiosResponse } from 'axios';
import { getNotification } from '~/src/api/notification/requests';
import { waitForAuthStatus } from '../auth/sagas';
import { AuthActionType, LoggedStatus } from '../auth/constants';

export function notificationChannel(id: string, token: string) {
  return eventChannel((emit) => {
    const eventSource = new EventSourcePolyfill(`${basePath}/notification/stream/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    eventSource.onmessage = ({ data }) => {
      const res = JSON.parse(data);
      emit(res);
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
    };
  })
}

export function* notificationWatcher() {
  yield takeLatest(NotificationActionType.NotificationStart, notificationChannelWorker);
  yield takeLatest(NotificationActionType.GetNotificationRequest, notificationWorker);
}

export function* notificationWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {
    try {
      const response: AxiosResponse<any> = yield call(getNotification);
      yield put(GetNotificationSuccess(response.data));
    } catch {
      yield put(GetNotificationFail());
    }
  }
}

export function* notificationChannelWorker() {
  const authStatus: LoggedStatus = yield call(waitForAuthStatus);

  if (authStatus === LoggedStatus.LoggedIn) {

    const id: string = yield select(userIdSelector);
    const token: string = yield select(userTokenSelector);
    const channel: EventChannel<number> = yield call(notificationChannel, id, token);

    try {
      while (true) {
        const { winner } = yield race({
          winner: take(channel),
          cancel: take(AuthActionType.LogoutSuccess)
        });
        if (winner) {
          yield put(unReadedUp());
        } else {
          channel.close();
        }
      }
    } catch (error) {
      channel.close();
      console.log(error);
    } finally {
      const cancel: boolean = yield cancelled();
      if (cancel) {
        channel.close();
      }
    }
  }
}
