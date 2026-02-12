import { UnknownAction } from 'redux';
import { RoleActionType, initialState } from "./constants";

export const roleReducer = (state: string[] = initialState, action: UnknownAction): string[] => {
  switch (action.type) {
    case RoleActionType.GetRoleSuccess: {
      return action.roles as string[];
    }
    // case AuthActionType.LogoutSuccess: {
    //   return initialState
    // }
    default: {
      return state;
    }
  }
};
