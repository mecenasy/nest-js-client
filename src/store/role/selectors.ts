
import { createSelector } from "reselect";
import { Option } from "~/src/modules/Components/Input/types";
import { ApplicationState } from "../configuration/constants";
import { Role, RoleType } from "./constants";

export const getRoles = (state: ApplicationState): Role[] => state.panelMenu.role;

export const rolesOptions = (roles: Role[]) => {
  return roles.map((role): Option<string> => roleOption(role));
}

export const roleOption = ({ _id, role }: Role) => {
  switch (role) {
    case RoleType.Admin: {
      return ({
        value: _id,
        label: 'Administrator'
      });
    }
    case RoleType.Student: {
      return ({
        value: _id,
        label: 'Student'
      });
    }
    default:
      return ({
        value: _id,
        label: 'Wykładowca'
      });
  }
}

export const roleSelector = createSelector<ApplicationState, Role[], Option<string>[]>(
  getRoles,
  rolesOptions,
)