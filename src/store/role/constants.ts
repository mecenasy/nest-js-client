export enum RoleType {
  Student = 'student',
  Teacher = 'teacher',
  Admin = 'admin',
  User = 'user',
}

export type RoleState = string[];

export const initialState: string[] = [];
