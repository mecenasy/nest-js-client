import { createSlice } from '@reduxjs/toolkit';

const hydrateSlice = createSlice({
  name: 'hydrate',
  initialState: false,
  reducers: {
    didHydrate: () => true,
  },
  selectors: {
    didHydrateSelector: (state) => state
  }
});

export const hydrateReducer = hydrateSlice.reducer;
export const { didHydrate } = hydrateSlice.actions;
export const { didHydrateSelector } = hydrateSlice.selectors;