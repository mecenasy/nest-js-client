import { MenuItemsState } from "./menu/constants";
import { Role } from "../role/constants";

export interface MenuPanelState {
  role: Role[];
  menu: MenuItemsState
}