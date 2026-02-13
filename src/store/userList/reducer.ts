import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { convertFieldsToArray } from '~/src/PageConfigs/helpers/concert-fields-to-array';
import { UserListState, initialState, ListType } from "./constants";
import { SimplePerson } from '../person/constants';
import { logoutSuccess } from '../auth/reducers';

export const getUserListRequest = createAction<{ searchParam: string, listType: ListType }>('userList/getUserListRequest');
export const getSimpleUserListRequest = createAction<ListType | undefined>('userList/getSimpleUserListRequest');
export const getSimpleUserListFail = createAction<ListType | undefined>('userList/getSimpleUserListFail');

const userListSlice = createSlice({
  name: 'userList',
  initialState,
  reducers: {
    getUserListSuccess: (state, action: PayloadAction<UserListState>) => {
      const { selectedFilters } = state;
      return { ...action.payload, selectedFilters };
    },
    getUserListFail: (state, _: PayloadAction<string>) => {
      state.isFetching = false;
    },
    getSimpleUserListSuccess: (state, action: PayloadAction<SimplePerson[]>) => {
      state.simpleUsers = action.payload;
    },
    setFilter: (state, action: PayloadAction<{ name: string, value: string | string[] | undefined }>) => {
      const { name, value } = action.payload;
      state.isFetching = true;
      state.selectedFilters[name] = value;
    },
    setPage: (state, action: PayloadAction<{ page?: number, pageSize?: number }>) => {
      const { page, pageSize } = action.payload;
      state.isFetching = true;
      if (page) state.selectedFilters.page = page;
      if (pageSize) state.selectedFilters.pageSize = pageSize;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutSuccess, () => initialState)
      .addCase(getUserListRequest, (state, action) => {
        const { searchParam } = action.payload;
        state.selectedFilters = convertFieldsToArray(
          Object.fromEntries(new URLSearchParams(searchParam ?? '')),
          ['page', 'pageSize', 'orderBy', 'orderType']
        );
        state.isFetching = true;
      });
  },
  selectors: {
    getUserList: (state) => state.users,
    getUserListFilters: (state) => state.filters,
    getSelectedFilters: (state) => state.selectedFilters,
    getFiltersMap: (state) => state.filtersMap,
    getUserListPagination: (state) => state.pagination,
    getFiltersMapSelector: (state) => state.filtersMap,
    getSimpleUsersSelector: (state) => state.simpleUsers,
  }
});

export const userListReducer = userListSlice.reducer;
export const {
  getUserListSuccess,
  getUserListFail,
  getSimpleUserListSuccess,
  setFilter,
  setPage
} = userListSlice.actions;
export const {
  getUserList,
  getUserListFilters,
  getSelectedFilters,
  getFiltersMap,
  getUserListPagination,
  getFiltersMapSelector,
  getSimpleUsersSelector
} = userListSlice.selectors;