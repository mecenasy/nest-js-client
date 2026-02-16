import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateSubject, initialState, Param, Subject } from './constants';
import { logoutSuccess } from '../auth/reducers';

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    getSubjects: (_, action: PayloadAction<Subject[]>) => {
      return action.payload;
    },
    addSubject: (state, action: PayloadAction<Subject>) => {
      state.push(action.payload);
    },
    deleteSubject: (state, action: PayloadAction<string>) => {
      return state.filter((subject) => subject.id !== action.payload);
    },
    updateSubject: (state, action: PayloadAction<Subject>) => {
      const index = state.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutSuccess, () => initialState);
  },
  selectors: {
    getSubjectSelector: (subjects, { search }: Param) => {
      if (search) {
        return subjects?.filter(({ name }) =>
          name?.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      }
      return subjects;
    },
  },
});

export const subjectReducer = subjectSlice.reducer;

export const { getSubjects, addSubject, deleteSubject, updateSubject } = subjectSlice.actions;
export const { getSubjectSelector } = subjectSlice.selectors;

export const getSubjectsRequest = createAction('subject/getSubjectsRequest');
export const addSubjectRequest = createAction<{
  subject: CreateSubject[];
  resolve: any;
  reject: any;
}>('subject/addSubjectRequest');
export const deleteSubjectRequest = createAction<string>('subject/deleteSubjectRequest');
export const updateSubjectRequest = createAction<Subject>('subject/updateSubjectRequest');

export const getSubjectsFail = createAction<string>('subject/getSubjectsFail');
export const addSubjectFail = createAction<string>('subject/addSubjectFail');
export const deleteSubjectFail = createAction<string>('subject/deleteSubjectFail');
export const updateSubjectFail = createAction<string>('subject/updateSubjectFail');
