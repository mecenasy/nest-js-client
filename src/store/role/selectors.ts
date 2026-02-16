import { roleSelector, roleOption } from './reducer';
export { roleSelector, roleOption };
export const getRoles = (state: any) => state.panelMenu.role;
export const rolesOptions = (roles: string[]) => roles.map(roleOption);
