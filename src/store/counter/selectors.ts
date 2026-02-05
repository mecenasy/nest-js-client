import { createSelector } from "reselect";

export const counterSelector = createSelector(
  (state) => state.counter,
  (count) => count.value,
)
