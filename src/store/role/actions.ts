import { RoleAction, RoleActionType } from "./constants";

export const getRoleRequest = (): RoleAction => ({
  type: RoleActionType.GetRoleRequest,
});

export const getRoleSuccess = (roles: string[]): RoleAction => ({
  roles,
  type: RoleActionType.GetRoleSuccess,
});

export const getRoleFail = (message: string): RoleAction => ({
  message,
  type: RoleActionType.GetRoleFail,
});
