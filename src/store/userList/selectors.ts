import { ApplicationState } from "../configuration/constants";
import { Person } from '../person/constants';
import { Filters, Pagination, SelectedFilters } from "./constants";

export const getUserList = (state: ApplicationState): Person[] => state.userList.users;

export const getUserListFilters = (state: ApplicationState): Filters => state.userList.filters;
export const getSelectedFiltersList = (state: ApplicationState): SelectedFilters => state.userList.selectedFilters;
export const getUserListPagination = (state: ApplicationState): Pagination => state.userList.pagination;