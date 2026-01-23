export enum RoleType {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
}

export interface Role {
  role: RoleType;
  _id: string;
}

export type RoleState = Role[]

export enum RoleActionType {
  GetRoleRequest = 'role/GET_ROLE_REQUEST',
  GetRoleSuccess = 'role/GET_ROLE_SUCCESS',
  GetRoleFail = 'role/GET_Role_FAIL',
}

export type RoleAction = {
  type: RoleActionType.GetRoleRequest;
} | {
  type: RoleActionType.GetRoleSuccess;
  roles: Role[];
} | {
  type: RoleActionType.GetRoleFail;
  message: string,
};

export const initialState: Role[] = [];
