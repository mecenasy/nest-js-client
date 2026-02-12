// import { AuthAction, AuthActionType } from "../auth/constants";
import { logoutSuccess } from "../auth/reducers";
import { initialState, MenuAction, MenuActionType, MenuState } from "./constants";

export const menuReducer = (state: MenuState = initialState, action: MenuAction): MenuState => {
  switch (action.type) {
    case MenuActionType.GetMenuSuccess: {
      return action.menu;
    }
    // case logoutSuccess.type: {
    //   return initialState
    // }
    default: {
      return state;
    }
  }
}
