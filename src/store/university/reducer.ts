import { AuthAction, AuthActionType } from "../auth/constants";
import { UniversityAction, UniversityActionType, initialState } from "./constants";

export const universityReducer = (state: any = initialState, action: UniversityAction | AuthAction): any => {
  switch (action.type) {
    case UniversityActionType.GetUniversitySuccess: {
      return action.data;
    }
    case AuthActionType.LogoutSuccess: {
      return initialState
    }
    default: {
      return state;
    }
  }
};
