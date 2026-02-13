import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Person, initialState, PersonFormData, PersonResponse } from "./constants";

export const getPersonRequest = createAction('person/GET_PERSON_REQUEST');
export const addPersonRequest = createAction<PersonFormData>('person/ADD_PERSON_REQUEST');

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    getPersonSuccess: (state, action: PayloadAction<PersonResponse>) => {
      return action.payload.person;
    },
    getPersonFail: (state, action: PayloadAction<PersonResponse>) => {
      return state;
    },
    addPersonSuccess: (_, action: PayloadAction<Person>) => {
      return action.payload;
    },
    addPersonFail: (state, action: PayloadAction<string>) => {
      return state;
    },
  },
  selectors: {
    getPerson: (state) => state,
  }
});

export const personReducer = personSlice.reducer;
export const {
  getPersonSuccess,
  getPersonFail,
  addPersonSuccess,
  addPersonFail
} = personSlice.actions;
export const { getPerson } = personSlice.selectors;