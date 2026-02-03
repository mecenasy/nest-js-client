import { convertFieldsToArray } from '~/src/PageConfigs/helpers/concert-fields-to-array';
import { UserListState, UserListAction, UserListActionType, initialState } from "./constants";

export const userListReducer = (state: UserListState = initialState, action: UserListAction): UserListState => {
  switch (action.type) {
    case UserListActionType.GetUserListRequest: {
      const { searchParam } = action
      return {
        ...state,
        selectedFilters: convertFieldsToArray(
          Object.fromEntries(new URLSearchParams(searchParam ?? '')),
          ['page', 'pageSize', 'orderBy', 'orderType']
        ),
        isFetching: true
      };
    }
    case UserListActionType.GetUserListSuccess: {
      const { selectedFilters } = state;
      return { ...action.userList, selectedFilters };
    }
    case UserListActionType.SetFilter: {
      const { name, value } = action;
      return {
        ...state,
        isFetching: true,
        selectedFilters: {
          ...state.selectedFilters,
          [name]: value
        }
      }
    }
    case UserListActionType.SetPage: {
      const { page, pageSize } = action;

      const newState = {
        ...state,
        isFetching: true,
        selectedFilters: {
          ...state.selectedFilters,
        }
      };

      if (page) {
        newState.selectedFilters.page = page;
      }
      if (pageSize) {
        newState.selectedFilters.pageSize = pageSize;
      }
      return newState
    }

    default: {
      return state;
    }
  }
};
