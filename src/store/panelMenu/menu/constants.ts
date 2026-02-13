import { DroppedFile, Option } from "~/src/modules/Components/Input/types"
import { MenuSide, Menu } from "../../menu/constants"
import { AxiosError, } from "axios";

export enum MenuItemActionType {
  GetMenuItemsRequest = 'menu/GET_MENU_ITEMS_REQUEST',
  GetMenuItemsSuccess = 'menu/GET_MENU_ITEMS_SUCCESS',
  GetMenuItemsFail = 'menu/GET_MENU_ITEMS_FAIL',
  UpdateMenuItemsRequest = 'menu/UPDATE_MENU_ITEM_REQUEST',
  SetMenuItemsRequest = 'menu/SET_MENU_ITEM_REQUEST',
  SetMenuItemsSuccess = 'menu/SET_MENU_ITEM_SUCCESS',
  SetMenuItemsFail = 'menu/SET_MENU_ITEM_FAIL',
  RemoveMenuItemsRequest = 'menu/REMOVE_MENU_ITEM_REQUEST',
  RemoveMenuItemsSuccess = 'menu/REMOVE_MENU_ITEM_SUCCESS',
  RemoveMenuItemsFail = 'menu/REMOVE_MENU_ITEM_FAIL',
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


export type MenuItem = Menu & { id: string, role: string[] };

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
  [MenuItemField.Role]: Option<string>[] | undefined;
}

export const initialState: MenuItem[] = [];

