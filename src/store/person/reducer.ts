import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Person, initialState, PersonFormData, PersonResponse } from "./constants";
import { logoutSuccess } from '../auth/reducers';

export const getPersonRequest = createAction('person/getPersonRequest');
export const addPersonRequest = createAction<PersonFormData & PromiseFParams>('person/addPersonRequest');
export const getPersonFail = createAction<string>('person/getPersonFail');
export const addPersonFail = createAction<string>('person/addPersonFail');

const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    getPersonSuccess: (state, action: PayloadAction<PersonResponse>) => {
      return action.payload.person;
    },
    addPersonSuccess: (_, action: PayloadAction<Person>) => {
      return action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    getPerson: (state) => state,
  }
});

export const personReducer = personSlice.reducer;
export const {
  getPersonSuccess,
  addPersonSuccess,
} = personSlice.actions;
export const { getPerson } = personSlice.selectors;