import { AuthAction, AuthActionType } from "../auth/constants";
import { PersonAction, Person, PersonActionType, initialState } from "./constants";

export const personReducer = (state: Person = initialState, action: PersonAction | AuthAction): Person => {
  switch (action.type) {
    case PersonActionType.GetPersonSuccess: {
      return action.person;
    }
    case AuthActionType.LogoutSuccess: {
      return initialState
    }
    default: {
      return state;
    }
  }
};
