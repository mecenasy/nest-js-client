import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState, RoleType } from "./constants";
import { logoutSuccess } from '../auth/reducers';
import { Option } from "~/src/modules/Components/Input/types";
import { ApplicationState } from '../configuration/constants';

export const getRoleRequest = createAction('role/GET_ROLE_REQUEST');
export const getRoleFail = createAction<string>('role/GET_ROLE_FAIL');

export const roleOption = (role: string): Option<string> => {
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

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    getRoleSuccess: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    roleSelector: (state) => state.map(roleOption),
  }
});

export const roleReducer = roleSlice.reducer;
export const { getRoleSuccess } = roleSlice.actions;
export const { roleSelector } = roleSlice.selectors;