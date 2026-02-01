
import { createSelector } from "reselect";
import { Option } from "~/src/modules/Components/Input/types";
import { ApplicationState } from "../configuration/constants";
import { RoleType } from "./constants";

export const getRoles = (state: ApplicationState): string[] => state.panelMenu.role;

export const rolesOptions = (roles: string[]) => {
  return roles.map((role): Option<string> => roleOption(role));
}

export const roleOption = (role: string) => {
  switch (role) {
    case RoleType.Admin: {
      return ({
        value: role,
        label: 'Administrator'
      });
    }
    case RoleType.Student: {
      return ({
        value: role,
        label: 'Student'
      });
    }
    case RoleType.User: {
      return ({
        value: role,
        label: 'Użytkownik'
      });
    }
    default:
      return ({
        value: role,
        label: 'Wykładowca'
      });
  }
}

export const roleSelector = createSelector<ApplicationState, string[], Option<string>[]>(
  getRoles,
  rolesOptions,
)