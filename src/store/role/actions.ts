import { RoleAction, RoleActionType, Role } from "./constants";

export const getRoleRequest = (): RoleAction => ({
   type: RoleActionType.GetRoleRequest,
});

export const getRoleSuccess = (roles: Role[]): RoleAction => ({
   roles,
   type: RoleActionType.GetRoleSuccess,
});

export const getRoleFail = (message: string): RoleAction => ({
   message,
   type: RoleActionType.GetRoleFail,
});
