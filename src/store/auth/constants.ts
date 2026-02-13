import { RoleType } from '../person/constants';
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
