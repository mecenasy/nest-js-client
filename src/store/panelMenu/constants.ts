import { DroppedFile, Option } from '~/src/modules/Components/Input/types';
import { MenuSide, Menu } from '../menu/constants';

export type MenuItem = Menu & { id: string; role: string[] };

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
  [MenuItemField.Hidden]?: boolean;
  [MenuItemField.Link]: string;
  [MenuItemField.Side]: MenuSide;
  [MenuItemField.SideBoolean]: boolean;
  [MenuItemField.Image]?: DroppedFile;
  [MenuItemField.Role]: Option<string>[] | undefined;
}

export const initialState: MenuItem[] = [];
