import { AuthAction, AuthActionType } from "../../auth/constants";
import { initialState, MenuItemsState, MenuItemAction, MenuItemActionType } from "./constants";

export const menuItemsReducer = (state: MenuItemsState = initialState, action: MenuItemAction | AuthAction): MenuItemsState => {
  switch (action.type) {
    case MenuItemActionType.GetMenuItemsSuccess: {
      return action.menu;
    }
    case AuthActionType.LogoutSuccess: {
      return initialState
    }
    default: {
      return state;
    }
  }
}
