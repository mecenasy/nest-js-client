import { createSelector } from "reselect";
import { ApplicationState } from "../../configuration/constants";
import { MenuSide } from "../../menu/constants";
import { roleOption } from "../../role/selectors";
import { MenuItem, MenuItemData, MenuItemField } from "./constants";

export const getMenuItems = (state: ApplicationState): MenuItem[] => state.panelMenu.menu;

export const getMenuItemById = createSelector(
  getMenuItems,
  (_: ApplicationState, id: string) => id,
  (menus: MenuItem[], id: string) => {
    const item = menus.find((menu: MenuItem) => menu.id === id);
    if (item) {
      const data: MenuItemData = {
        [MenuItemField.Id]: item.id,
        [MenuItemField.Name]: item.name,
        [MenuItemField.ShortName]: item.shortName || '',
        [MenuItemField.Position]: item.position,
        [MenuItemField.Hidden]: item.hidden,
        [MenuItemField.Link]: item.link,
        [MenuItemField.Side]: item.menuSide,
        [MenuItemField.SideBoolean]: item.menuSide === MenuSide.Right,
        [MenuItemField.Role]: item.role?.map(roleOption),
      }
      return data;
    }
    return undefined
  },
);