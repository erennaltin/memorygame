import { configureStore } from "@reduxjs/toolkit";
import pointerSlice from "./pointerSlice";

export const store = configureStore({
  reducer: {
    point: pointerSlice,
  },
});
