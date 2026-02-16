import { Task } from '@redux-saga/types';
import { LOCATION_CHANGE } from 'redux-first-history';
import {
  call,
  cancel,
  delay,
  fork,
  put,
  race,
  select,
  take,
  takeLatest,
  apply,
} from 'redux-saga/effects';
import cookie from 'js-cookie';
import {
  loginUser,
  logoutUser,
  refreshUserToken,
  changePasswordUser,
} from '../../api/auth/requests';
import * as A from './reducers';
import { AuthState, LoggedStatus } from './constants';
import { loggedInStatusSelector, tokenExpiredInSelector } from './reducers';
import axios from 'axios';

export function* authWatcher() {
  yield takeLatest(A.loginRequest.type, loginWorker);
  yield takeLatest(A.logoutRequest.type, logoutWorker);
  yield takeLatest(A.changePasswordRequest.type, changePasswordWorker);
  yield takeLatest(A.logoutSuccess.type, cancelRefreshWorker);
  yield takeLatest(A.refreshTokenRequest.type, initialAuth);

  if (!SERVER_BUILD) {
    yield fork(initialAuth);
  }
}

let refreshTask: Task;

export function* initialAuth() {
  try {
    const { data }: { data: AuthState } = yield call(refreshUserToken);
    const { auth, user } = data;

    if (user) {
      yield apply(cookie, 'set', ['jwt', auth.token, { expires: +auth.expireAt }]);
      yield put(A.loginSuccess({ user, auth: { ...auth, loggedIn: LoggedStatus.LoggedIn } }));
    } else {
      yield put(A.logoutSuccess());
    }
  } catch {
    yield put(A.logoutSuccess());
  }
}

function* cancelRefreshWorker() {
  if (refreshTask && refreshTask.isRunning()) {
    yield cancel(refreshTask);
  }
}

export function* loginWorker(action: ReturnType<typeof A.loginRequest>) {
  if (action.type === A.loginRequest.type) {
    try {
      const {
        data: { auth, user },
      }: { data: AuthState } = yield call(loginUser, action.payload.user, action.payload.password);

      yield apply(cookie, 'set', ['jwt', auth.token, { expires: +auth.expireAt }]);
      yield put(A.loginSuccess({ user, auth }));

      refreshTask = yield fork(refreshTokenWorker);
      yield call(action.payload.resolve, undefined);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.message.includes('401')) {
          const errorMessage = {
            errorMessage: {
              error: 'Logowanie się nie powiopdło. Sprawdź czy masz poprawny login i hasło.',
            },
          };
          yield put(A.loginSuccess(errorMessage));
          yield call(action.payload.resolve, errorMessage);
          return;
        }
        yield put(A.loginFail());
        yield call(action.payload.resolve, undefined);
      }
    }
  }
}

export function* changePasswordWorker(action: ReturnType<typeof A.changePasswordRequest>) {
  if (action.type === A.changePasswordRequest.type) {
    try {
      yield call(changePasswordUser, action.payload.oldPassword, action.payload.newPassword);

      yield put(A.changePasswordSuccess());

      yield call(action.payload.resolve, undefined);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.changePasswordFail());
        yield call(action.payload.reject);
      }
    }
  }
}

export function* refreshTokenWorker() {
  while (true) {
    try {
      const initialTime = +new Date();
      const expiresIn: number = yield select(tokenExpiredInSelector);
      const expiresTime = +expiresIn - 5000;

      const { winner } = yield race({
        winner: take(LOCATION_CHANGE),
        error: delay(expiresTime),
      });

      if (winner) {
        const executeTime = +new Date();
        const toExpiresTime = expiresTime - (executeTime - initialTime);

        if (toExpiresTime > 60000) {
          yield delay(60000);
        }
        const { data }: { data: AuthState } = yield call(refreshUserToken);

        yield put(A.refreshTokenSuccess({ auth: data.auth }));
      } else {
        yield put(A.logoutSuccess());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.loginFail());
      }
    }
  }
}

export function* logoutWorker() {
  try {
    yield call(logoutUser);
    yield apply(cookie, 'remove', ['jwt']);

    yield put(A.logoutSuccess());
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(A.logoutFail());
    }
  }
}

export function* waitForAuthStatus(): any {
  let authStatus: LoggedStatus = yield select(loggedInStatusSelector);

  if (authStatus === LoggedStatus.Unknown) {
    if (SERVER_BUILD) {
      let retry = 10;

      while (retry) {
        yield delay(200);
        authStatus = yield select(loggedInStatusSelector);
        if (authStatus !== LoggedStatus.Unknown) {
          retry--;
        }
      }
    } else {
      yield take([A.loginSuccess.type, A.logoutSuccess.type, A.loginFail.type]);
    }
  }

  return yield authStatus;
}
