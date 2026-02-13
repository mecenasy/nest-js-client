import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CreateSubject, initialState, Subject } from './constants';

interface Param {
  group?: string;
  year?: string;
  search?: string
}

const subjectSlice = createSlice({
  name: 'subject',
  initialState,
  reducers: {
    getSubjects: (state, action: PayloadAction<Subject[]>) => {
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
  selectors: {
    getSubjectSelector: (subjects, { search }: Param) => {
      if (search) {
        return subjects?.
          filter(({ name }) => name?.toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()))
      }
      return subjects
    }
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
