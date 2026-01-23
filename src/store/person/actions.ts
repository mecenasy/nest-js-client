import { PersonAction, PersonActionType, Person, PersonFormData } from "./constants";

export const getPersonRequest = (): PersonAction => ({
  type: PersonActionType.GetPersonRequest,
});

export const getPersonSuccess = (userId: string, person: Person): PersonAction => ({
  userId,
  person,
  type: PersonActionType.GetPersonSuccess,
});

export const getPersonFail = (userId: string, message: string): PersonAction => ({
  userId,
  message,
  type: PersonActionType.GetPersonFail,
});

export const addPersonRequest = (person: PersonFormData): PersonAction => ({
  type: PersonActionType.AddPersonRequest,
  person,
});

export const addPersonSuccess = (person: Person): PersonAction => ({
  type: PersonActionType.AddPersonSuccess,
  person,
});

export const addPersonFail = (message: string): PersonAction => ({
  message,
  type: PersonActionType.AddPersonFail,
});
