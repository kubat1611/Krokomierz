import { createSlice } from '@reduxjs/toolkit';

const stepsSlice = createSlice({
  name: 'steps',
  initialState: { stepCount: 0 },
  reducers: {
    setSteps: (state: { stepCount: any; }, action: { payload: any; }) => {
      state.stepCount = action.payload;
    },
  },
});

export const { setSteps } = stepsSlice.actions;
export default stepsSlice.reducer;
