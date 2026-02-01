import { UserList, UserListAction, UserListActionType, initialState } from "./constants";

export const userListReducer = (state: UserList = initialState, action: UserListAction): UserList => {
  switch (action.type) {
    case UserListActionType.GetUserListSuccess: {
      const { selectedFilters } = state;
      return { ...action.userList, selectedFilters };
    }
    case UserListActionType.SetFilter: {
      const { name, value } = action;
      return {
        ...state,
        selectedFilters: {
          ...state.filters,
          [name]: value
        }
      }
    }

    default: {
      return state;
    }
  }
};
