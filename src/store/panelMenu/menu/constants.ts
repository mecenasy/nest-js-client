import { DroppedFile, Option } from "~/src/modules/Components/Input/types"
import { Role, } from "../../role/constants"
import { MenuSide, Menu } from "../../menu/constants"
import { AxiosError, } from "axios";

export enum MenuItemActionType {
  GetMenuItemsRequest = 'GET_MENU_ITEMS_REQUEST',
  GetMenuItemsSuccess = 'GET_MENU_ITEMS_SUCCESS',
  GetMenuItemsFail = 'GET_MENU_ITEMS_FAIL',
  UpdateMenuItemsRequest = 'UPDATE_MENU_ITEM_REQUEST',
  SetMenuItemsRequest = 'SET_MENU_ITEM_REQUEST',
  SetMenuItemsSuccess = 'SET_MENU_ITEM_SUCCESS',
  SetMenuItemsFail = 'SET_MENU_ITEM_FAIL',
  RemoveMenuItemsRequest = 'REMOVE_MENU_ITEM_REQUEST',
  RemoveMenuItemsSuccess = 'REMOVE_MENU_ITEM_SUCCESS',
  RemoveMenuItemsFail = 'REMOVE_MENU_ITEM_FAIL',
}

export type MenuItemAction = {
  type: MenuItemActionType.GetMenuItemsRequest;
} | {
  type: MenuItemActionType.GetMenuItemsSuccess;
  menu: MenuItem[]
} | {
  type: MenuItemActionType.GetMenuItemsFail;
  error: AxiosError
} | {
  type: MenuItemActionType.SetMenuItemsRequest;
  item: MenuItemData
} | {
  type: MenuItemActionType.SetMenuItemsSuccess;
} | {
  type: MenuItemActionType.SetMenuItemsFail;
  error: AxiosError
} | {
  type: MenuItemActionType.RemoveMenuItemsRequest;
  id: string;
} | {
  type: MenuItemActionType.RemoveMenuItemsSuccess;
} | {
  type: MenuItemActionType.RemoveMenuItemsFail;
  error: AxiosError
}


export type MenuItem = Menu & { _id: string, role: Role[] };

export type MenuItemsState = MenuItem[];

export enum MenuItemField {
  Id = '_id',
  Name = 'name',
  ShortName = 'shortName',
  Position = 'position',
  Hidden = 'hidden',
  Link = 'link',
  Side = 'menuSide',
  SideBoolean = 'sideBoolean',
  Image = 'image',
  Role = 'role',
}

export interface MenuItemData {
  [MenuItemField.Id]?: string;
  [MenuItemField.Name]: string;
  [MenuItemField.ShortName]?: string;
  [MenuItemField.Position]: number;
  [MenuItemField.Hidden]?: boolean
  [MenuItemField.Link]: string;
  [MenuItemField.Side]: MenuSide;
  [MenuItemField.SideBoolean]: boolean;
  [MenuItemField.Image]?: DroppedFile;
  [MenuItemField.Role]: Option<string>[];
}

export const initialState: MenuItem[] = [];

