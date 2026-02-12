import { AuthActionType } from "../auth/constants";
import { UniversityAction, UniversityActionType, initialState } from "./constants";

export const universityReducer = (state: any = initialState, action: UniversityAction): any => {
  switch (action.type) {
    case UniversityActionType.GetUniversitySuccess: {
      return action.data;
    }
    // case AuthActionType.LogoutSuccess: {
    //   return initialState
    // }
    default: {
      return state;
    }
  }
};
