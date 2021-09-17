import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  move: 0,
};

export const pointerSlice = createSlice({
  name: "point",
  initialState,
  reducers: {
    paired: (state) => {
      state.value += 50;
      state.move += 1;
    },
    failed: (state) => {
      state.value -= 10;
      state.move += 1;
    },
    reset: (state) => {
      state.value = 0;
      state.move = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { paired, failed, reset } = pointerSlice.actions;

export default pointerSlice.reducer;
