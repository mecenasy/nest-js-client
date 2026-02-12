import { AxiosError } from 'axios';
import { RoleType } from '../person/constants';
import { Reducer, UnknownAction } from 'redux';

export enum AuthActionType {
  LoginRequest = 'auth/LOGIN_REQUEST',
  LoginSuccess = 'auth/LOGIN_SUCCESS',
  LoginFail = 'auth/LOGIN_FAIL',
  ChangePasswordRequest = 'auth/CHANG_PASSWORD_REQUEST',
  ChangePasswordSuccess = 'auth/CHANG_PASSWORD_SUCCESS',
  ChangePasswordFail = 'auth/CHANG_PASSWORD_FAIL',
  LogoutRequest = 'auth/LOGOUT_REQUEST',
  LogoutSuccess = 'auth/LOGOUT_SUCCESS',
  LogoutFail = 'auth/LOGOUT_FAIL',
  RefreshTokenRequest = 'auth/REFRESH_TOKEN_REQUEST',
  RefreshTokenSuccess = 'auth/REFRESH_TOKEN_SUCCESS',
  RefreshTokenFail = 'auth/REFRESH_TOKEN_FAIL',
}
export interface User {
  name: string;
  userId: string;
  role?: RoleType;
  isDefaultPassword?: boolean;
}

export interface Auth {
  loggedIn: LoggedStatus;
  token: string;
  expireAt: string;
}
export interface LoginSuccess {
  user?: User;
  auth?: Auth;
  errorMessage?: Record<string, string>;
}
export interface RefreshTokenSuccess {
  auth: Auth;
}

export interface AuthState {
  auth: Auth;
  user: User;
}
export interface AuthReducer {
  auth: Reducer<Auth, UnknownAction>;
  user: Reducer<User, UnknownAction>;
}

export enum LoggedStatus {
  LoggedIn = 'LoggedIn',
  LoggedOut = 'LoggedOut',
  Unknown = 'Unknown',
}

export const userInitialState: User = {
  name: '',
  userId: '',
};

export const authInitialState: Auth = {
  loggedIn: LoggedStatus.Unknown,
  expireAt: '0',
  token: '',
};

export enum LoginField {
  Error = 'error',
  User = 'user',
  Password = 'password',
}
export interface LoginData {
  [LoginField.User]: string;
  [LoginField.Password]: string;
  [LoginField.Error]?: Record<string, string>;
}

export enum ChangePasswordField {
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  ConfirmPassword = 'confirmPassword',
}
export interface ChangePasswordData {
  [ChangePasswordField.OldPassword]: string;
  [ChangePasswordField.NewPassword]: string;
  [ChangePasswordField.ConfirmPassword]: string;
}

export interface AuthStorage {
  token: string;
  expiresIn: number;
  personId: string;
}

export const tokenKey = 'token';
export const expiresInKey = 'expiresIn';
export const personIdKey = 'personId';
