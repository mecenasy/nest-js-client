import { ApplicationState } from "../configuration/constants";
import { SelectedFilters, UserList } from "./constants";

export const getUserList = (state: ApplicationState): UserList => state.userList;
export const getParamsList = (state: ApplicationState): SelectedFilters => state.userList.selectedFilters;