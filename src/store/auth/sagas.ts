import { Task } from '@redux-saga/types';
import { LOCATION_CHANGE } from 'connected-react-router';
import { call, cancel, delay, fork, put, race, select, take, takeLatest, apply } from 'redux-saga/effects';
import cookie from 'js-cookie';
import { loginUser, logoutUser, refreshUserToken, changePasswordUser } from '../../api/auth/requests';
import * as A from './actions';
import { AuthAction, AuthActionType, AuthState, LoggedStatus } from './constants';
import { loggedInStatusSelector, tokenExpiredInSelector } from './selectors';
import axios, { AxiosError } from 'axios';

export function* authWatcher() {
  yield takeLatest(AuthActionType.LoginRequest, loginWorker);
  yield takeLatest(AuthActionType.LogoutRequest, logoutWorker);
  yield takeLatest(AuthActionType.ChangePasswordRequest, changePasswordWorker);
  yield takeLatest(AuthActionType.LogoutSuccess, cancelRefreshWorker);
  yield takeLatest(AuthActionType.RefreshTokenRequest, initialAuth);

  if (!SERVER_BUILD) {
    yield fork(initialAuth);
  }
}

let refreshTask: Task;

export function* initialAuth() {
  try {
    const { data }: { data: AuthState } = yield call(refreshUserToken);
    const { auth, user } = data

    if (user) {
      yield apply(cookie, 'set', ['jwt', auth.token, { expires: +auth.expireAt }]);
      yield put(A.loginSuccess(user, { ...auth, loggedIn: LoggedStatus.LoggedIn }));
    } else {
      yield put(A.logoutSuccess());
    }
  } catch (error) {
    yield put(A.logoutSuccess());

  }
}

function* cancelRefreshWorker() {
  if (refreshTask && refreshTask.isRunning()) {
    yield cancel(refreshTask);
  }
}

export function* loginWorker(action: AuthAction) {
  if (action.type === AuthActionType.LoginRequest) {
    try {
      const { data: { auth, user } }: { data: AuthState } = yield call(loginUser, action.user, action.password);

      yield apply(cookie, 'set', ['jwt', auth.token, { expires: +auth.expireAt }]);
      yield put(A.loginSuccess(user, auth));

      refreshTask = yield fork(refreshTokenWorker);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const parsedError: AxiosError<any> = error;

        if (parsedError.message.includes('401')) {
          yield put(A.loginSuccess(undefined, undefined, { error: 'Logowanie się nie powiopdło. Sprawdź czy masz poprawny login i hasło.' }));
          return;
        }
        yield put(A.loginFail(error));
      }
    }
  }
}

export function* changePasswordWorker(action: AuthAction) {
  if (action.type === AuthActionType.ChangePasswordRequest) {
    try {
      yield call(changePasswordUser, action.oldPassword, action.newPassword);

      yield put(A.changePasswordSuccess());

    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.changePasswordFail(error));
      }
    }
  }
}

export function* refreshTokenWorker() {
  while (true) {
    try {
      const initialTime = +new Date();
      const expiresIn: number = yield select(tokenExpiredInSelector);
      const expiresTime = +expiresIn - 5000

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

        yield put(A.refreshTokenSuccess(data.auth));
      } else {
        yield put(A.logoutSuccess());
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        yield put(A.loginFail(error));
      }
    }
  }
}

export function* logoutWorker() {
  try {
    yield call(logoutUser);
    yield apply(cookie, 'remove', ['jwt']);

    yield put(A.logoutSuccess())
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(A.logoutFail(error));
    }
  }
}

export function* waitForAuthStatus(): any {
  let authStatus: LoggedStatus = yield select(loggedInStatusSelector);

  if (authStatus === LoggedStatus.Unknown) {
    if (SERVER_BUILD) {
      let retry = 10;

      while (retry) {
        yield (delay(200));
        authStatus = yield select(loggedInStatusSelector);
        if (authStatus !== LoggedStatus.Unknown) {
          retry--;
        }
      }
    } else {
      yield take([
        AuthActionType.LoginSuccess,
        AuthActionType.LogoutSuccess,
        AuthActionType.LoginFail,
      ]);
    }
  }

  return yield authStatus;
}
