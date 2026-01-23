import { AuthAction, AuthActionType } from "../auth/constants";
import { StudentAction, StudentActionType, initialState } from "./constants";

export const studentReducer = (state: any = initialState, action: StudentAction | AuthAction): any => {
  switch (action.type) {
    case StudentActionType.GetStudentSuccess: {
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
