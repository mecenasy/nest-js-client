import { createSlice, PayloadAction, combineReducers, createAction } from '@reduxjs/toolkit';
import {
  authInitialState,
  userInitialState,
  LoggedStatus,
  LoginSuccess,
  RefreshTokenSuccess,
  AuthReducer,
} from "./constants";

export const loginRequest = createAction<{ user: string, password: string }>('auth/loginRequest');
export const logoutRequest = createAction('auth/logoutRequest');
export const refreshTokenRequest = createAction('auth/refreshTokenRequest');
export const changePasswordRequest = createAction<{ newPassword: string, oldPassword: string }>('auth/changePasswordRequest');

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    loginSuccess: (_, action: PayloadAction<LoginSuccess>) => {
      if (action.payload.auth) {
        return {
          ...action.payload.auth,
          loggedIn: LoggedStatus.LoggedIn,
        };
      }
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    },
    loginFail: () => {
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    },
    logoutSuccess: () => {
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    },
    logoutFail: () => {
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    },
    refreshTokenSuccess: (_, action: PayloadAction<RefreshTokenSuccess>) => {
      if (action.payload.auth) {
        return {
          ...action.payload.auth,
          loggedIn: LoggedStatus.LoggedIn,
        };
      }
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    },
    refreshTokenFail: () => {},
    changePasswordSuccess: () => {},
    changePasswordFail: () => {},
  },
});


export const {
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  refreshTokenSuccess,
  refreshTokenFail,
  changePasswordSuccess,
  changePasswordFail
} = authSlice.actions;

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authSlice.actions.loginSuccess, (state, action) => {
      if (action.payload.user) {
        return action.payload.user;
      }
      return userInitialState;
    });
    builder.addCase(logoutSuccess, () => userInitialState);
    builder.addCase(logoutFail, () => userInitialState);
    builder.addCase(loginFail, () => userInitialState);
  }
});



export const authReducer = authSlice.reducer;
export const userReducer = userSlice.reducer;

export const authCombinedReducer = combineReducers<AuthReducer>({
  auth: authReducer,
  user: userReducer,
});
