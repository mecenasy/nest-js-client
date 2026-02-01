import { AuthAction, AuthActionType } from "../auth/constants";
import { RoleAction, RoleActionType, initialState } from "./constants";

export const roleReducer = (state: string[] = initialState, action: RoleAction | AuthAction): string[] => {
  switch (action.type) {
    case RoleActionType.GetRoleSuccess: {
      return action.roles;
    }
    case AuthActionType.LogoutSuccess: {
      return initialState
    }
    default: {
      return state;
    }
  }
};
