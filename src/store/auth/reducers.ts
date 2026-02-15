import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import {
  authInitialState,
  userInitialState,
  LoggedStatus,
  LoginSuccess,
  RefreshTokenSuccess,
  LoginData,
  ChangePasswordData,
} from "./constants";

export const loginRequest = createAction<LoginData & PromiseFParams>('auth/loginRequest');
export const logoutRequest = createAction('auth/logoutRequest');
export const refreshTokenRequest = createAction('auth/refreshTokenRequest');
export const changePasswordRequest = createAction<Omit<ChangePasswordData, 'confirmPassword'> & PromiseFParams>('auth/changePasswordRequest');

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
  selectors: {
    userTokenSelector: (state) => state.token,
    loggedInStatusSelector: (state) => state.loggedIn,
    tokenExpiredInSelector: (state) => +state.expireAt,

  }
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
  },
  selectors: {
    getIsDefaultPassword: (state) => state.isDefaultPassword,
    userIdSelector: (state) => state.userId,
    userSelector: (state) => state,
    userRoleSelector: (state) => state.role,
  }
});

export const authReducer = authSlice.reducer;
export const userReducer = userSlice.reducer;

export const {
  loggedInStatusSelector,
  userTokenSelector,
  tokenExpiredInSelector
} = authSlice.selectors;
export const {
  getIsDefaultPassword,
  userIdSelector,
  userSelector,
  userRoleSelector
} = userSlice.selectors;
