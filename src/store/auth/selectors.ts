import { createSelector } from "reselect";
import { ApplicationState } from "../configuration/constants";
import { RoleType } from "../role/constants";
import { LoggedStatus, User } from "./constants";

export const userSelector = ({ auth }: ApplicationState): User => auth.user;
export const userIdSelector = ({ auth }: ApplicationState): string => auth.user.userId;
export const userTokenSelector = ({ auth }: ApplicationState): string => auth.auth.token;

export const loggedInStatusSelector = ({ auth }: ApplicationState): LoggedStatus => auth.auth.loggedIn;
export const tokenExpiredInSelector = ({ auth }: ApplicationState): number => +auth.auth.expireAt;
export const userRoleSelector = ({ auth }: ApplicationState): RoleType | undefined => auth.user.role;

export const getUserId = createSelector(
  userSelector,
  ({ userId }) => userId,
);

export const getIsDefaultPassword = createSelector(
  userSelector,
  ({ isDefaultPassword }) => isDefaultPassword,
);
