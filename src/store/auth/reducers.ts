import { combineReducers } from "redux";
import {
  AuthAction,
  AuthActionType,
  authInitialState,
  userInitialState,
  Auth,
  User,
  LoggedStatus,
  AuthReducer,
} from "./constants";

export const authReducer = (state: Auth = authInitialState, action: AuthAction): Auth => {
  switch (action.type) {
    case AuthActionType.LoginSuccess:
    case AuthActionType.RefreshTokenSuccess: {
      if (action.auth) {
        return {
          ...action.auth,
          loggedIn: LoggedStatus.LoggedIn,
        };
      }
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    }
    case AuthActionType.LoginFail:
    case AuthActionType.LogoutSuccess:
    case AuthActionType.LogoutFail: {
      return {
        ...authInitialState,
        loggedIn: LoggedStatus.LoggedOut,
      };
    }
    default: {
      return state;
    }
  }
}

export const userReducer = (state: User = userInitialState, action: AuthAction): User => {
  switch (action.type) {
    case AuthActionType.LoginSuccess: {
      if (action.user) {
        return action.user;
      }
      return userInitialState;
    }
    case AuthActionType.LogoutSuccess:
    case AuthActionType.LogoutFail: {
      return userInitialState;
    }
    default: {
      return state;
    }
  }
}

export const authCombinedReducer = combineReducers<AuthReducer>({
  auth: authReducer,
  user: userReducer,
});
