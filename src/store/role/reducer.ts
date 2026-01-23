import { AuthAction, AuthActionType } from "../auth/constants";
import { RoleAction, Role, RoleActionType, initialState } from "./constants";

export const roleReducer = (state: Role[] = initialState, action: RoleAction | AuthAction): Role[] => {
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
