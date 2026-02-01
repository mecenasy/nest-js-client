export enum RoleType {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  User = 'user',
}

export type RoleState = string[]

export enum RoleActionType {
  GetRoleRequest = 'role/GET_ROLE_REQUEST',
  GetRoleSuccess = 'role/GET_ROLE_SUCCESS',
  GetRoleFail = 'role/GET_Role_FAIL',
}

export type RoleAction = {
  type: RoleActionType.GetRoleRequest;
} | {
  type: RoleActionType.GetRoleSuccess;
  roles: string[];
} | {
  type: RoleActionType.GetRoleFail;
  message: string,
};

export const initialState: string[] = [];
