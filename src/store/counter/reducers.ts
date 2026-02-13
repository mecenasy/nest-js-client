import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { initialState } from './constants';

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByCount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    }
  },
  selectors: {
    counterSelector: (state) => state.value
  }
});

export const counterReducer = counterSlice.reducer;
export const { increment, decrement, incrementByCount } = counterSlice.actions;
export const { counterSelector } = counterSlice.selectors;

export const incrementByCountRequest = createAction<number>('counter/incrementByCountRequest');
