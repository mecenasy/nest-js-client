import { ApplicationState } from "../configuration/constants";
import { Person } from '../person/constants';
import { University } from '../university/constants';
import { Filters, Pagination, SelectedFilters } from "./constants";

export const getUserList = (state: ApplicationState): Person[] => state.userList.users;

export const getUserListFilters = (state: ApplicationState): Filters => state.userList.filters;
export const getSelectedFilters = (state: ApplicationState): SelectedFilters => state.userList.selectedFilters;
export const getFiltersMap = (state: ApplicationState): University => state.userList.filtersMap;
export const getUserListPagination = (state: ApplicationState): Pagination => state.userList.pagination;

export const getFiltersMapSelector = (state: ApplicationState): University => state.userList.filtersMap;